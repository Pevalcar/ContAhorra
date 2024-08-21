module.exports = {
  extends: ["expo", "prettier", "react-app"],
  plugins: ["prettier", require("prettier-plugin-tailwindcss")],
  rules: {
    "prettier/prettier": "error",
  },
  tailwindFunctions: ["tva"],
};
