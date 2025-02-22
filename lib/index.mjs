import pascalCaseFileNames from "./rules/pascal-case-file-names.mjs";
import snakeCaseFolders from "./rules/snake-case-folders.mjs";

export default {
  rules: {
    "snake-case-folders": snakeCaseFolders,
    "pascal-case-file-names": pascalCaseFileNames
  },
  configs: {
    recommended: {
      rules: {
        "cov/snake-case-folders": "error",
        "cov/pascal-case-file-names": "error"
      }
    }
  }
};
