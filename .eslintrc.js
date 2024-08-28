module.exports = {
  extends: ["expo", "prettier", "react-app"],
  plugins: [
    "prettier",
    require("prettier-plugin-tailwindcss"),
    "@trivago/prettier-plugin-sort-imports",
  ],
  rules: {
    "prettier/prettier": "error",
  },
  tailwindFunctions: ["tva"],
};
