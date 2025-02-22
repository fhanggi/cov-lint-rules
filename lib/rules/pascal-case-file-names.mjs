import path from "path";

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce PascalCase naming convention for files in subfolders under src folder",
      category: "Stylistic Issues",
      recommended: true
    },
    schema: []
  },
  create(context) {
    const sourceFile = context.getFilename();

    // Normalize the path to handle both Windows and Unix-style paths
    const normalizedPath = sourceFile.replace(/\\/g, "/");
    const parsedPath = path.parse(normalizedPath);
    const folders = parsedPath.dir.split("/").filter((folder) => {
      // Filter out empty strings, dots, and drive letters (e.g., "C:")
      return folder && folder !== "." && !/^[A-Za-z]:$/.test(folder);
    });

    // Only check files under 'src' subfolders
    const srcIndex = folders.indexOf("src");
    if (srcIndex === -1 || folders.length <= srcIndex + 1) {
      return {}; // Do not apply checks if not inside a src subfolder
    }

    return {
      Program(node) {
        const fileName = parsedPath.name;
        // PascalCase pattern: starts with uppercase, then lowercase or numbers,
        // subsequent words must start with a single uppercase followed by lowercase or numbers
        if (!/^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)*$/.test(fileName)) {
          context.report({
            node,
            message: `File name "${fileName}" should be in PascalCase format with no consecutive uppercase letters (e.g., Hello, MyComponent, IsThisOk)`
          });
        }
      }
    };
  }
};