module.exports = {
  extends: ["expo", "prettier", "eslint:recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": "off",
  },
  overrides: [
    {
      // Test files only
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
