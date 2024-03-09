const fs = require('fs');
const path = require('path');
const listPath = [];

function getFullPath(dir) {
  traverseDir(dir);
  return listPath;
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else {
      listPath.push(fullPath);
    }
  });
}

module.exports ={
  getFullPath,
};
