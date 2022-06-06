import '@babel/polyfill';
import koa from 'koa';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './config/index';
import portfinder from 'portfinder';
import webpackHotMiddleware from 'webpack-hot-middleware';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import ora from 'ora';
import { getArgv, stabilization } from './utils';
// chalk插件，用来在命令行中输入不同颜色的文字
import chalk from 'chalk';
import kill from 'kill-port';
import { port } from '../../app/config';
// opn插件是用来打开特定终端的，此文件用来在默认浏览器中打开链接 opn(url)
import opn from 'opn';
// 引入http-proxy-middleware插件，此插件是用来代理请求的只能用于开发环境，目的主要是解决跨域请求后台api
import proxyMiddleware from 'http-proxy-middleware';
// console.log('config========',config)
class App {
    constructor() {
        this.app = new koa();
        this.init();
    }

    async init() {
        this.environment();
        this.middleware();
        // this.listen();
    }

    environment() {
        let webpackEnv = getArgv('webpackEnv');
        const NODE_ENV = process.env.NODE_ENV; // 环境参数
        //    是否是测试开发环境
        this.isEnvDevelopment = NODE_ENV === 'development';
        //   是否是生产环境
        this.isEnvProduction = NODE_ENV === 'production';
    }

    getCompiler() {
        // 开启转圈圈动画
        const spinner = ora('building.....');
        spinner.start();
        const compiler = webpack(config, (err, stats) => {
            spinner.stop();
            

            // stabilization(500).then(() => {
                if (err) {
                    console.log('Errors:' + chalk.red(err.stack || err));
                    if (err.details) {
                        console.log('Errors:' + chalk.red(err.details));
                    }
                    return;
                }

                if (stats.hasErrors()) {
                    console.log(
                        'Errors:' +
                            chalk.red(
                                stats.toString({
                                    colors: true,
                                }) + '\n\n'
                            )
                    );
                } else if (stats.hasWarnings()) {
                    console.log(
                        'Warnings:' +
                            chalk.yellow(
                                stats.toString({
                                     colors: true,
                                }) + '\n\n'
                            )
                    );
                }
                
                // else {
                //     process.stdout.write(
                //         stats.toString({
                //             colors: true,
                //         }) + '\n\n'
                //     );
                // }
            });
            // console.log(chalk.rgb(13, 188, 121)("Build complete .\n"));
        // });
        //  console.log('compiler.hooks=',compiler.hooks)
        //  console.log('compiler.hooks=',compiler.hooks)

        // compiler.hooks.SyncHook.tap('compile',()=>{
        //    console.log('watchRun======')
        // })

        // const watching = compiler.watch({}, (err, stats) => {
        //     spinner.stop();

        //     if (err) {
        //         console.log('Errors:' + chalk.red(err.stack || err));
        //         if (err.details) {
        //             console.log('Errors:' + chalk.red(err.details));
        //         }
        //         return;
        //     }

        //     if (stats.hasErrors()) {
        //         console.log(
        //             'Errors:' +
        //                 chalk.red(
        //                     stats.toString({
        //                         colors: true,
        //                     }) + '\n\n'
        //                 )
        //         );
        //     } else if (stats.hasWarnings()) {
        //         console.log(
        //             'Warnings:' +
        //                 chalk.red(
        //                     stats.toString({
        //                         colors: true,
        //                     }) + '\n\n'
        //                 )
        //         );
        //     } else {
        //         process.stdout.write(
        //             stats.toString({
        //                 colors: true,
        //             }) + '\n\n'
        //         );
        //     }

        //     !this.isEnvDevelopment &&
        //         watching.close(() => {
        //             console.log('Watching Ended.');
        //         });
        // });

        // if (this.isEnvDevelopment) {
        // compiler.watch(
        //   {
        //     // [watchOptions](/configuration/watch/#watchoptions) 示例
        //     aggregateTimeout: 300,
        //     poll: undefined,
        //   },
        //   (err, stats) => {
        //     //   console.log()
        //     // process.stdout.write(stats.toString({
        //     //     colors: true,
        //     //   }) + '\n\n')
        //     if (err) throw err;
        //     process.stdout.write(
        //       stats.toString({
        //         colors: true,
        //       }) + "\n\n"
        //     );
        //   }
        // );
        // }
        return compiler;
    }
    //浏览器服务器 待续
    devMiddleware() {
        const compiler = this.getCompiler();

        const devMiddleware = webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath,
            serverSideRender: true, // 是否是服务器渲染
            // quiet: true,
        });
        // 下面是加载动画
        devMiddleware.waitUntilValid(() => {
            // 启动服务器
            // console.log(">第一次代码编译完成");
            // when env is testing, don't need open it
            //  测试环境不打开浏览器
            //   if (autoOpenBrowser && process.env.NODE_ENV !== "testing") {
            //     opn(uri);
            //   }
        });
        return devMiddleware;
    }

    hotMiddleware() {
        const hotMiddleware = webpackHotMiddleware(compiler, {
            log: () => {},
        });
        return hotMiddleware;
    }
    connectMiddleware() {
        return connectHistoryApiFallback();
    }
    proxyMiddleware() {
        const proxyTable = config.devServer || {};
        // proxy api requests
        // 下面是代理表的处理方法， 可以使用后台,代理后台地址
        Object.keys(proxyTable).forEach(function (context) {
            // 下面是代理表的处理方法， 可以使用后台管理
            var options = proxyTable[context];
            if (typeof options === 'string') {
                options = { target: options };
            }
            this.app.use(proxyMiddleware(options.filter || context, options));
        });
    }
    async middleware() {
        //代理
        // this.proxyMiddleware();
        // webpack node 服务
        // this.app.use(this.connectMiddleware());
        // this.isEnvDevelopment
        //   ? this.app.use(this.devMiddleware())
        //   : this.getCompiler();
        this.getCompiler();
        this.app.use(this.hotMiddleware);
    }

    async listen() {
        const port = await new Promise((resolve, reject) => {
            //查找端口号
            portfinder.getPort((err, port) => {
                if (err) {
                    reject(err);
                    return;
                }
                // 新端口
                resolve(port);
            });
        });
        this.server = this.app.listen(port, () => {
            console.log(`\n编译代码服务器端口:${port}\n`);
        });
    }
}

export default App;
