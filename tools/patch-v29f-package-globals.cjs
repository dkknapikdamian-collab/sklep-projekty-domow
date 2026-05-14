const fs = require("fs");

function read(file) {
  return fs.readFileSync(file, "utf8");
}
function write(file, value) {
  fs.writeFileSync(file, value, "utf8");
}

const pkg = JSON.parse(read("package.json"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:admin-ui-debug-v28"] = "node scripts/check-admin-ui-debug-v28.cjs";
pkg.scripts["verify:public-service-role-read-v27"] = "node scripts/check-public-service-role-read-v27.cjs";
pkg.scripts["verify:admin-debug-v26"] = "node scripts/check-admin-debug-v26.cjs";

const required = [
  "verify:admin-ui-debug-v28",
  "verify:public-service-role-read-v27",
  "verify:admin-debug-v26"
];
const currentVerify = String(pkg.scripts.verify || "");
for (const item of required.reverse()) {
  if (!currentVerify.includes(item)) {
    pkg.scripts.verify = `npm run ${item} && ${pkg.scripts.verify || "npm run build"}`;
  }
}
write("package.json", JSON.stringify(pkg, null, 2) + "\n");

let globals = read("app/globals.css");
if (!globals.includes('@import "./admin-ui-debug-v28.css";')) {
  globals = '@import "./admin-ui-debug-v28.css";\n' + globals;
}
write("app/globals.css", globals);
