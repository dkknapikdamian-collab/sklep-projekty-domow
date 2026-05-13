const fs = require("fs");
const path = require("path");

const root = process.cwd();
const actionsPath = path.join(root, "app", "admin", "projekty", "nowy", "actions.ts");
const packagePath = path.join(root, "package.json");

if (!fs.existsSync(actionsPath)) {
  throw new Error("Missing app/admin/projekty/nowy/actions.ts");
}

let source = fs.readFileSync(actionsPath, "utf8");

const oldLine = "const code = await generateProjectCode(supabase);";
const newBlock = `let code = "";

  try {
    code = await generateProjectCode(supabase);
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Nie udało się wygenerować kodu projektu. Sprawdź migrację 0012_project_code_generation.sql w Supabase."
    };
  }`;

if (source.includes(oldLine)) {
  source = source.replace(oldLine, newBlock);
} else if (!source.includes("let code =")) {
  throw new Error("Could not find project code generation line to patch.");
}

fs.writeFileSync(actionsPath, source);

if (!fs.existsSync(packagePath)) {
  throw new Error("Missing package.json");
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:server-action-400-v16"] = "node scripts/check-server-action-400-v16.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:server-action-400-v16")) {
  pkg.scripts.verify = "npm run verify:server-action-400-v16 && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:server-action-400-v16";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\\n");

console.log("OK: V16 Server Action 400 repair applied.");
