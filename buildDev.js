const { spawn } = require("child_process");

currentPath = __dirname
console.log(currentPath)
webPackPath = currentPath+'\\node_modules\\.bin\\'
console.log(webPackPath)
const webpack = spawn('cd', [webPackPath]);
// const webpack = spawn(webPackPath, ["serve","--mode", "development", "--env", "development"]);

// webpack.stdout.on("data", data => {
//     console.log(`stdout: ${data}`);
// });
