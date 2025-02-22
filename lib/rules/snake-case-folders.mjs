import path from "path";

// Set to track which folders have already been reported - moved outside create function
const reportedFolders = new Set();

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce snake_case naming convention for folders under src folder",
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

    // Only check folders under 'src'
    const srcIndex = folders.indexOf("src");
    if (srcIndex === -1) {
      return {}; // Do not apply any checks if not inside a src folder
    }
    const foldersToCheck = folders.slice(srcIndex + 1);

    return {
      Program(node) {
        foldersToCheck.forEach((folder) => {
          if (!/^[a-z][a-z0-9]*(_[a-z0-9]+)*$/.test(folder) && !reportedFolders.has(folder)) {
            context.report({
              node,
              message: `Folder name "${folder}" should be in snake_case format`
            });
            reportedFolders.add(folder);
          }
        });
      }
    };
  }
};
