const path = require("path");

console.warn("LEGACY GUARD: manual payment is not the target production direction. Running payment-direction guard instead.");
require(path.join(__dirname, "check-payment-direction-v48.cjs"));
