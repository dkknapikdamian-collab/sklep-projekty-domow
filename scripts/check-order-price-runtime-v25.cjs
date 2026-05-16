const fs = require("fs");
const path = require("path");

const root = process.cwd();

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function readRequired(file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) fail(`missing required file: ${file}`);
  return fs.readFileSync(fullPath, "utf8");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadValidatorModule() {
  const sourceFile = "lib/order/validate-cart-against-db.ts";
  const source = readRequired(sourceFile);

  for (const marker of [
    "validateCartAgainstDb",
    "CART_PRICE_CHANGED_MESSAGE",
    "Cena projektu lub dodatków zmieniła się. Odśwież koszyk.",
    '.from("projects")',
    '.eq("code", item.projectCode)',
    '.eq("slug", item.projectSlug)',
    'project.status !== "active"',
    '.from("project_addons")',
    '.eq("active", true)',
    '.from("project_variants")',
    "assertSamePrice(item.basePriceGross, project.price_gross)",
    "assertSamePrice(item.variantPriceGross, variant.price_gross)",
    "assertSamePrice(selectedAddon.priceGross, addon.price_gross)"
  ]) {
    if (!source.includes(marker)) fail(`${sourceFile} missing marker: ${marker}`);
  }

  let ts;
  try {
    ts = require("typescript");
  } catch (error) {
    fail("typescript package is required to run this runtime guard. Run npm install first.");
  }

  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove
    }
  }).outputText;

  const module = { exports: {} };
  const exports = module.exports;
  const localRequire = (id) => {
    throw new Error(`Unexpected runtime require while loading validator guard: ${id}`);
  };

  try {
    const factory = new Function("require", "module", "exports", transpiled + "\nreturn module.exports;");
    factory(localRequire, module, exports);
  } catch (error) {
    fail(`could not load transpiled validate-cart-against-db.ts: ${error.message}`);
  }

  if (typeof module.exports.validateCartAgainstDb !== "function") {
    fail("validateCartAgainstDb export is not a function.");
  }

  if (module.exports.CART_PRICE_CHANGED_MESSAGE !== "Cena projektu lub dodatków zmieniła się. Odśwież koszyk.") {
    fail("CART_PRICE_CHANGED_MESSAGE changed or is not exported as expected.");
  }

  return module.exports;
}

function baseDb(overrides = {}) {
  const db = {
    projects: [
      {
        id: "project-1",
        code: "DP-AUR-014",
        slug: "aurora-014",
        name: "Dom Aurora 014",
        price_gross: 4990,
        status: "active"
      }
    ],
    project_addons: [
      {
        project_id: "project-1",
        code: "PDF_EMAIL",
        name: "Projekt w formacie PDF na e-mail",
        description: "Pakiet PDF wysyłany e-mailem po obsłudze zamówienia.",
        price_gross: 250,
        delivery_action: "send_pdf_email",
        active: true
      }
    ],
    project_variants: [
      {
        project_id: "project-1",
        name: "Lustrzane odbicie",
        price_gross: 750,
        active: true
      }
    ]
  };

  const next = clone(db);
  return typeof overrides === "function" ? overrides(next) : Object.assign(next, overrides);
}

function baseCart(overrides = {}) {
  const cart = {
    items: [
      {
        id: "cart-item-1",
        projectCode: "DP-AUR-014",
        projectSlug: "aurora-014",
        projectName: "Nazwa z koszyka klienta",
        basePriceGross: 4990,
        variantName: "Lustrzane odbicie",
        variantPriceGross: 750,
        selectedAddons: [
          {
            code: "PDF_EMAIL",
            name: "Nazwa dodatku z koszyka klienta",
            description: "Opis z koszyka klienta",
            priceGross: 250,
            deliveryAction: "send_pdf_email"
          }
        ],
        availableAddons: [],
        addedAt: "2026-05-16T00:00:00.000Z"
      }
    ]
  };

  const next = clone(cart);
  return typeof overrides === "function" ? overrides(next) : Object.assign(next, overrides);
}

function findFilter(filters, column) {
  const found = filters.find((filter) => filter.column === column);
  return found ? found.value : undefined;
}

function applyActiveFilter(rows, filters) {
  const activeFilter = findFilter(filters, "active");
  if (activeFilter === undefined) return rows;
  return rows.filter((row) => row.active === activeFilter);
}

function makeSupabaseMock(db) {
  const calls = [];

  function resolveRows(state) {
    const projectId = findFilter(state.filters, "project_id");

    if (state.table === "project_addons") {
      return {
        data: applyActiveFilter(db.project_addons.filter((row) => row.project_id === projectId), state.filters),
        error: null
      };
    }

    if (state.table === "project_variants") {
      return {
        data: applyActiveFilter(db.project_variants.filter((row) => row.project_id === projectId), state.filters),
        error: null
      };
    }

    return { data: [], error: new Error(`Unsupported list table in mock: ${state.table}`) };
  }

  function resolveSingle(state) {
    if (state.table !== "projects") {
      return { data: null, error: new Error(`Unsupported maybeSingle table in mock: ${state.table}`) };
    }

    const code = findFilter(state.filters, "code");
    const slug = findFilter(state.filters, "slug");
    const project = db.projects.find((row) => {
      if (code !== undefined) return row.code === code;
      if (slug !== undefined) return row.slug === slug;
      return false;
    });

    return { data: project || null, error: null };
  }

  return {
    calls,
    from(table) {
      const state = { table, selected: null, filters: [] };
      calls.push(state);

      const builder = {
        select(selected) {
          state.selected = selected;
          return builder;
        },
        eq(column, value) {
          state.filters.push({ column, value });
          return builder;
        },
        maybeSingle() {
          return Promise.resolve(resolveSingle(state));
        },
        then(resolve, reject) {
          return Promise.resolve(resolveRows(state)).then(resolve, reject);
        }
      };

      return builder;
    }
  };
}

async function expectReject(name, validateCartAgainstDb, cart, db) {
  const supabase = makeSupabaseMock(db);
  try {
    await validateCartAgainstDb(supabase, cart);
  } catch (error) {
    if (error instanceof Error && error.message === "Cena projektu lub dodatków zmieniła się. Odśwież koszyk.") {
      pass(name);
      return;
    }
    fail(`${name}: wrong error: ${error instanceof Error ? error.message : String(error)}`);
  }

  fail(`${name}: expected validator to reject stale client cart.`);
}

async function expectPass(name, validateCartAgainstDb, cart, db, assertResult) {
  const supabase = makeSupabaseMock(db);
  let result;
  try {
    result = await validateCartAgainstDb(supabase, cart);
  } catch (error) {
    fail(`${name}: unexpected rejection: ${error instanceof Error ? error.message : String(error)}`);
  }

  assertResult(result, supabase.calls);
  pass(name);
}

(async function main() {
  const { validateCartAgainstDb } = loadValidatorModule();

  await expectPass(
    "valid cart is accepted and normalized from database",
    validateCartAgainstDb,
    baseCart(),
    baseDb(),
    (result, calls) => {
      const item = result.items[0];
      if (item.projectName !== "Dom Aurora 014") fail("validator did not normalize projectName from DB.");
      if (item.basePriceGross !== 4990) fail("validator did not normalize base price from DB.");
      if (item.variantName !== "Lustrzane odbicie") fail("validator did not normalize variant name from DB.");
      if (item.variantPriceGross !== 750) fail("validator did not normalize variant price from DB.");
      if (item.selectedAddons[0].name !== "Projekt w formacie PDF na e-mail") {
        fail("validator did not normalize selected addon from DB.");
      }
      if (item.availableAddons.length !== 1) fail("validator did not return DB active addons.");
      if (!calls.some((call) => call.table === "projects" && call.filters.some((filter) => filter.column === "code"))) {
        fail("validator did not query project by code first.");
      }
      if (!calls.some((call) => call.table === "project_addons" && call.filters.some((filter) => filter.column === "active" && filter.value === true))) {
        fail("validator did not query only active addons.");
      }
      if (!calls.some((call) => call.table === "project_variants" && call.filters.some((filter) => filter.column === "active" && filter.value === true))) {
        fail("validator did not query only active variants.");
      }
    }
  );

  await expectPass(
    "cart can be validated by slug when code is missing",
    validateCartAgainstDb,
    baseCart((cart) => {
      cart.items[0].projectCode = "";
      return cart;
    }),
    baseDb(),
    (result, calls) => {
      if (result.items[0].projectCode !== "DP-AUR-014") fail("validator did not restore project code from DB.");
      if (!calls.some((call) => call.table === "projects" && call.filters.some((filter) => filter.column === "slug"))) {
        fail("validator did not fall back to project slug lookup.");
      }
    }
  );

  await expectPass(
    "base variant cart is accepted without paid variant row",
    validateCartAgainstDb,
    baseCart((cart) => {
      cart.items[0].variantName = "Projekt podstawowy";
      cart.items[0].variantPriceGross = 0;
      return cart;
    }),
    baseDb((db) => {
      db.project_variants = [];
      return db;
    }),
    (result) => {
      if (result.items[0].variantPriceGross !== 0) fail("base variant should keep zero variant price.");
    }
  );

  await expectReject(
    "old cart with changed base price is rejected",
    validateCartAgainstDb,
    baseCart((cart) => {
      cart.items[0].basePriceGross = 3990;
      return cart;
    }),
    baseDb()
  );

  await expectReject(
    "inactive project is rejected",
    validateCartAgainstDb,
    baseCart(),
    baseDb((db) => {
      db.projects[0].status = "draft";
      return db;
    })
  );

  await expectReject(
    "removed addon is rejected",
    validateCartAgainstDb,
    baseCart(),
    baseDb((db) => {
      db.project_addons = [];
      return db;
    })
  );

  await expectReject(
    "changed addon price is rejected",
    validateCartAgainstDb,
    baseCart(),
    baseDb((db) => {
      db.project_addons[0].price_gross = 350;
      return db;
    })
  );

  await expectReject(
    "removed paid variant is rejected",
    validateCartAgainstDb,
    baseCart(),
    baseDb((db) => {
      db.project_variants = [];
      return db;
    })
  );

  await expectReject(
    "changed variant price is rejected",
    validateCartAgainstDb,
    baseCart(),
    baseDb((db) => {
      db.project_variants[0].price_gross = 990;
      return db;
    })
  );

  console.log("OK: Etap 25 order price runtime validation guard passed.");
})().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
