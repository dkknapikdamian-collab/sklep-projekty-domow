const fs = require("fs");
const path = require("path");

const repo = process.cwd();
const actionsPath = path.join(repo, "app/admin/projekty/actions.ts");
const packagePath = path.join(repo, "package.json");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function findFunctionBlock(source, marker) {
  const start = source.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find marker: ${marker}`);
  }

  const braceStart = source.indexOf("{", start);
  if (braceStart === -1) {
    throw new Error(`Could not find function opening brace after marker: ${marker}`);
  }

  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    const char = source[index];

    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;

    if (depth === 0) {
      return {
        start,
        end: index + 1,
        text: source.slice(start, index + 1)
      };
    }
  }

  throw new Error(`Could not find function closing brace after marker: ${marker}`);
}

function ensureRedirectRethrow(functionText) {
  if (functionText.includes("NEXT_REDIRECT") && functionText.includes("throw error;")) {
    return functionText;
  }

  const catchNeedle = "} catch (error) {";
  const catchIndex = functionText.lastIndexOf(catchNeedle);

  if (catchIndex === -1) {
    throw new Error("Could not find updateProjectAction catch block.");
  }

  const rethrowBlock = `} catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      String((error as { digest?: unknown }).digest || "").startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }`;

  return functionText.slice(0, catchIndex) + rethrowBlock + functionText.slice(catchIndex + catchNeedle.length);
}

function ensureSuccessRedirect(functionText) {
  const desiredRedirect =
    'redirect(`/admin/projekty?updated=${encodeURIComponent(String(oldProject.code || projectId))}&saved=1`);';

  if (functionText.includes('/admin/projekty?updated=') && functionText.includes('&saved=1')) {
    return functionText;
  }

  const successReturnRegex =
    /\n\s*return\s*\{\s*ok:\s*true,\s*message:\s*["'`]Zapisano projekt i wszystkie powiazane dane\.["'`]\s*\};/;

  if (successReturnRegex.test(functionText)) {
    return functionText.replace(successReturnRegex, `\n    ${desiredRedirect}`);
  }

  const catchNeedle = "\n  } catch (error) {";
  const catchIndex = functionText.lastIndexOf(catchNeedle);

  if (catchIndex === -1) {
    throw new Error("Could not find insertion point before updateProjectAction catch block.");
  }

  return functionText.slice(0, catchIndex) + `\n    ${desiredRedirect}` + functionText.slice(catchIndex);
}

function ensureFailureStateStillExists(functionText) {
  if (!functionText.includes("return {") || !functionText.includes("ok: false")) {
    throw new Error("updateProjectAction no longer returns error state on failures.");
  }

  return functionText;
}

function patchActions() {
  let source = read(actionsPath);

  const block = findFunctionBlock(source, "export async function updateProjectAction");
  let functionText = block.text;

  functionText = ensureRedirectRethrow(functionText);
  functionText = ensureSuccessRedirect(functionText);
  functionText = ensureFailureStateStillExists(functionText);

  if (functionText === block.text) {
    console.log("OK: updateProjectAction already has V31E redirect behavior.");
    return;
  }

  source = source.slice(0, block.start) + functionText + source.slice(block.end);
  write(actionsPath, source);

  console.log("PATCHED: app/admin/projekty/actions.ts edit-save success redirects to project list with NEXT_REDIRECT rethrow.");
}

function patchPackage() {
  const pkg = JSON.parse(read(packagePath));
  pkg.scripts = pkg.scripts || {};

  pkg.scripts["verify:admin-save-redirect-v31"] = "node scripts/check-admin-save-redirect-v31.cjs";

  const verifyStep = "npm run verify:admin-save-redirect-v31";
  const verify = String(pkg.scripts.verify || "");

  if (!verify.includes(verifyStep)) {
    pkg.scripts.verify = verify ? `${verifyStep} && ${verify}` : verifyStep;
  }

  write(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log("PATCHED: package.json verify:admin-save-redirect-v31.");
}

patchActions();
patchPackage();

console.log("OK: V31E save redirect patch applied.");
