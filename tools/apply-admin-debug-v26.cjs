const fs = require("fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function write(path, content) {
  fs.writeFileSync(path, content, "utf8");
}

function patchPackageJson() {
  const path = "package.json";
  const pkg = JSON.parse(read(path));

  pkg.scripts = pkg.scripts || {};
  pkg.scripts["verify:admin-debug-v26"] = "node scripts/check-admin-debug-v26.cjs";

  const verify = String(pkg.scripts.verify || "");
  if (!verify.includes("verify:admin-debug-v26")) {
    pkg.scripts.verify = verify
      ? `npm run verify:admin-debug-v26 && ${verify}`
      : "npm run verify:admin-debug-v26";
  }

  write(path, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log("PATCHED: package.json");
}

function patchGlobals() {
  const path = "app/globals.css";
  let content = read(path);
  const marker = '@import "./admin-debug-v26.css";';

  if (!content.includes(marker)) {
    const lines = content.split(/\r?\n/);
    let insertIndex = 0;
    while (insertIndex < lines.length && lines[insertIndex].trim().startsWith("@import")) {
      insertIndex += 1;
    }
    lines.splice(insertIndex, 0, marker);
    content = lines.join("\n");
    write(path, content);
    console.log("PATCHED: app/globals.css");
  } else {
    console.log("OK: app/globals.css already imports admin-debug-v26.css");
  }
}

function patchAdminHeader() {
  const path = "components/admin/AdminHeader.tsx";
  let content = read(path);

  if (!content.includes("Bug")) {
    content = content.replace(
      /import \{ ([^}]+) \} from "lucide-react";/,
      (match, imports) => {
        const parts = imports.split(",").map((item) => item.trim()).filter(Boolean);
        if (!parts.includes("Bug")) parts.splice(1, 0, "Bug");
        return `import { ${parts.join(", ")} } from "lucide-react";`;
      }
    );
  }

  if (!content.includes('href="/admin/debug"')) {
    const anchor = '        <Link href="/admin/strona-glowna"><MonitorCog size={17} /> Strona główna</Link>';
    const replacement = `${anchor}
        <Link href="/admin/debug"><Bug size={17} /> Debug</Link>`;
    if (!content.includes(anchor)) {
      throw new Error("Could not locate AdminHeader nav anchor for Strona glowna.");
    }
    content = content.replace(anchor, replacement);
  }

  write(path, content);
  console.log("PATCHED: components/admin/AdminHeader.tsx");
}

function patchAdminDashboard() {
  const path = "app/admin/page.tsx";
  let content = read(path);

  if (!content.includes("Bug")) {
    content = content.replace(
      /import \{ ([^}]+) \} from "lucide-react";/,
      (match, imports) => {
        const parts = imports.split(",").map((item) => item.trim()).filter(Boolean);
        if (!parts.includes("Bug")) parts.splice(0, 0, "Bug");
        return `import { ${parts.join(", ")} } from "lucide-react";`;
      }
    );
  }

  if (!content.includes('href="/admin/debug"')) {
    const anchor = `          <div className="admin-action-card muted">
            <Settings size={34} />
            <h2>Ustawienia sklepu</h2>
            <p>Tu pozniej pojawia sie dane kontaktowe, role, platnosci i e-mail.</p>
          </div>`;

    const debugCard = `          <Link href="/admin/debug" className="admin-action-card">
            <Bug size={34} />
            <h2>Debug admina</h2>
            <p>Szybka diagnostyka env, Storage, tabel, banera i publicznych projektow.</p>
          </Link>

${anchor}`;

    if (!content.includes(anchor)) {
      throw new Error("Could not locate admin dashboard settings card anchor.");
    }

    content = content.replace(anchor, debugCard);
  }

  write(path, content);
  console.log("PATCHED: app/admin/page.tsx");
}

patchPackageJson();
patchGlobals();
patchAdminHeader();
patchAdminDashboard();

console.log("OK: V26 admin debug patch applied.");
