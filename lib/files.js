const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: filePath => {
    try {
      return fs.statSync(filepath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};
