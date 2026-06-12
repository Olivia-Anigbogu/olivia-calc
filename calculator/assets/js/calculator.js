/* ============================================================
   Olivia Nneka Anigbogu — SEN 482 Calculator
   calculator.js
   
   ARCHITECTURE NOTE:
   Pure logic functions are defined first and exported at the
   bottom (for Node/Jest). The UI layer (appendVal, calculate,
   etc.) runs only when document is available (browser only).
   This lets Jest import and test the pure functions directly
   without needing a DOM.
   ============================================================ */

// ──────────────────────────────────────────────────────────────
// PURE LOGIC FUNCTIONS  (no DOM touches — fully testable)
// ──────────────────────────────────────────────────────────────

/**
 * Evaluate a basic arithmetic expression string.
 * Supports: numbers, +  -  *  /  and decimal points.
 * Returns a number, or throws if the expression is invalid.
 *
 * @param {string} expression
 * @returns {number}
 */
function evaluate(expression) {
  if (typeof expression !== "string" || expression.trim() === "") {
    throw new Error("Empty expression");
  }

  // Reject anything that isn't digits, operators, dots, or whitespace.
  // This prevents arbitrary code execution from eval().
  if (!/^[\d\s+\-*/.]+$/.test(expression)) {
    throw new Error("Invalid characters in expression");
  }

  // Use Function constructor instead of eval — slightly safer scope.
  // eslint-disable-next-line no-new-func
  const result = new Function("return " + expression)();

  if (typeof result !== "number" || !isFinite(result)) {
    throw new Error("Invalid result");
  }

  return result;
}

/**
 * Check whether an integer n is a prime number.
 *
 * A prime is a natural number greater than 1 that has no positive
 * divisors other than 1 and itself.
 *
 * Algorithm: trial division up to √n (O(√n)).
 *
 * @param {number} n — must be a non-negative integer
 * @returns {boolean}
 */
function isPrime(n) {
  // Must be a whole number ≥ 2
  if (!Number.isInteger(n) || n < 2) return false;

  // 2 is the only even prime
  if (n === 2) return true;

  // All other even numbers are not prime
  if (n % 2 === 0) return false;

  // Trial division by odd numbers up to √n
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}

/**
 * Format a number for display — trim unnecessary trailing zeros
 * after the decimal point, cap at 10 significant digits.
 *
 * @param {number} num
 * @returns {string}
 */
function formatResult(num) {
  if (!isFinite(num)) return "Error";
  // parseFloat removes trailing zeros; toPrecision caps length
  const str = parseFloat(num.toPrecision(10)).toString();
  return str;
}

// ──────────────────────────────────────────────────────────────
// UI STATE  (browser only)
// ──────────────────────────────────────────────────────────────

let currentExpression = "";

function updateDisplay() {
  const el = document.getElementById("expr");
  const val = currentExpression || "0";
  el.textContent = val;

  // Resize text when the string gets long
  el.classList.toggle("long", val.length > 12);
  el.classList.toggle("xlong", val.length > 18);
  el.classList.toggle("error", val === "Error");
}

function hidePrimeBanner() {
  const banner = document.getElementById("prime-banner");
  banner.className = "prime-banner";
  banner.textContent = "";
}

function showPrimeBanner(text, type) {
  const banner = document.getElementById("prime-banner");
  banner.textContent = text;
  banner.className = "prime-banner show" + (type ? " " + type : "");
}

// ──────────────────────────────────────────────────────────────
// UI EVENT HANDLERS  (called from onclick in HTML)
// ──────────────────────────────────────────────────────────────

function appendVal(v) {
  if (currentExpression === "Error") currentExpression = "";
  // Prevent multiple decimal points in the current number segment
  if (v === ".") {
    const segments = currentExpression.split(/[+\-*/]/);
    const last = segments[segments.length - 1];
    if (last.includes(".")) return;
  }
  currentExpression += v;
  hidePrimeBanner();
  updateDisplay();
}

function appendOp(op) {
  if (currentExpression === "Error") currentExpression = "";
  if (currentExpression === "") return; // no leading operator
  // Replace trailing operator rather than stack them
  const last = currentExpression.slice(-1);
  if (["+", "-", "*", "/"].includes(last)) {
    currentExpression = currentExpression.slice(0, -1);
  }
  currentExpression += op;
  hidePrimeBanner();
  updateDisplay();
}

function clearResult() {
  currentExpression = "";
  hidePrimeBanner();
  updateDisplay();
}

function backspace() {
  if (currentExpression === "Error") {
    currentExpression = "";
  } else {
    currentExpression = currentExpression.slice(0, -1);
  }
  hidePrimeBanner();
  updateDisplay();
}

function calculate() {
  if (!currentExpression || currentExpression === "Error") return;
  try {
    const result = evaluate(currentExpression);
    currentExpression = formatResult(result);
    hidePrimeBanner();
    updateDisplay();
  } catch {
    currentExpression = "Error";
    updateDisplay();
  }
}

/**
 * PRIME NUMBER FEATURE
 * Reads the current display value, checks if it is a prime integer,
 * and shows a clear result banner.
 */
function checkPrime() {
  if (!currentExpression || currentExpression === "Error") {
    showPrimeBanner("⚠ Enter a number first", "error");
    return;
  }
  const num = Number(currentExpression);
  if (!Number.isInteger(num) || num < 0) {
    showPrimeBanner("⚠ Enter a whole number ≥ 0", "error");
    return;
  }
  if (isPrime(num)) {
    showPrimeBanner(`✓ ${num} is a PRIME number`, "");
  } else {
    showPrimeBanner(`✗ ${num} is NOT a prime number`, "not-prime");
  }
}

// ──────────────────────────────────────────────────────────────
// MODULE EXPORT  (Node / Jest — skipped in browser)
// ──────────────────────────────────────────────────────────────

// Export pure functions for Jest (ES module syntax)
// Export pure functions for Jest (Node only — skipped in browser)
// Export pure functions for Jest (Node only — skipped in browser)
export { evaluate, isPrime, formatResult };