// process.stdin.setEncoding('utf8');
// process.stdout.write("当前端口号已经被占用，是否更改为：1000？是的请输入:yes,否则输入no。");
// process.stdin.on('readable', () => {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });

// const spawn = require('child_process').spawn;

// const ls = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run',  'ls']);

// console.log('ls=',ls)



const { exec } = require('child_process');
exec('cat *.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行的错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});


// // 运行npm
// var ps = require('child_process').spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], {
//     stdio: 'inherit',
//     // cwd: srcPath
// });

// ps.on('error', function(err) {
//     console.log(err);
// });

// ps.on('exit', function (err) {
//     console.log('exit');
// });

// const { exec } = require('child_process');
// exec('cat *.js', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行的错误: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });


// var childProcess = require('child_process');
 
// var commitMessage = (function() {
//     var spawn = childProcess.spawnSync('cat', ['*.js']);
//     console.log('spawn=',spawn)
// 	// var errorText = spawn.stderr.toString().trim();
//     // console.log('spawn.stdout.toString().trim()==',spawn.stdout.toString().trim())
// 	// if (errorText) {
// 	//   console.log('Fatal error from `git log`.  You must have one commit before deploying.');
// 	//   throw new Error(errorText);
// 	// }
// 	// else {
// 	//   return spawn.stdout.toString().trim();
// 	// }
// })();



// const spawn = require('child_process').spawn;
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// var exec = require('child_process').exec;

// // 成功的例子
// exec('ls -al', function(error, stdout, stderr){
//     console.log('error=',error)
//     if(error) {
//         console.error('error: ' + error);
//         return;
//     }
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + typeof stderr);
// });


// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// async function lsExample() {
//   const { stdout, stderr } = await exec('ls');
//   console.log('stdout:', stdout);
//   console.error('stderr:', stderr);
// }
// lsExample();



// const { execFile } = require('child_process');
// const child = execFile('node', ['--version'], (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });



// const { spawn } = require('child_process');
// const ls = spawn('ls', [ '/app']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`子进程退出，退出码 ${code}`);
// });




// var process = require('child_process');
// var spawn = require('child_process').spawn;


// free = spawn('cd ..');
// // 捕获标准输出并将其打印到控制台 

// free.stdout.on('data', function (data) { 

// console.log('standard output:\n' + data); 

// });

// 捕获标准错误输出并将其打印到控制台 

// free.stderr.on('data', function (data) { 

// console.log('standard error output:\n' + data); 

// });



// process.exec('ls',function (error, stdout, stderr) {
//     console.log('error==',error)
//     console.log('stdout==',stdout)
//     console.log('stderr==',stderr)
//     if (error !== null) {
//       console.log('exec error: ' + error);
//     }
// });
// //輸出顔色包
// const chalk = require('chalk')
// var inquirer = require('inquirer')
// //用户输入确认
// inquirer.prompt([ { 
//   type: 'confirm', 
//   name: 'test', 
//   message: 'Are you handsome?', 
//   default: true 
// }]).then((answers) => { 
//     console.log('结果为:');
//     console.log(answers)

// })

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   var chunk = process.stdin.read();
//   if(typeof chunk === 'string'){
//     chunk = chunk.slice(0,-2);
//     process.stdout.write(`stringLength:${chunk.length}\n`);
//   }
//   if(chunk === ''){
//     process.stdin.emit('end');
//     return
//   }
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}\n`);
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });

// console.log(chalk.blue('Hello world!'));
