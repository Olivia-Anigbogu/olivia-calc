const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        document: "readonly",
        window: "readonly",
        module: "writable",
        console: "readonly",
        appendVal: "writable",
        appendOp: "writable",
        clearResult: "writable",
        backspace: "writable",
        calculate: "writable",
        checkPrime: "writable",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "error",
      semi: ["error", "always"],
      "no-console": "off",
    },
  },
];
