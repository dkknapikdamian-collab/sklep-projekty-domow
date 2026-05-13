# V16B — package.json repair after V16

Fixes a bad literal `\n` appended to package.json by the previous V16 apply tool.

This repair:
- cleans package.json from BOM and trailing literal `\n`
- applies/keeps V16 server action 400 fix
- writes package.json with valid UTF-8 without BOM
- runs full verify
- commits and pushes only after verify passes
