/**
 * Created by lin_yu on 2018/4/13.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: { // 配置此静态文件服务器，可以用来预览打包后项目
        contentBase: path.resolve(__dirname, 'dist'), // 开发服务运行时的文件根目录
        host: 'localhost', // 主机地址
        port: 9090, // 端口号
        compress: true, // 开发服务器是否启动gzip等压缩
        watchContentBase: false
    },
    plugins: [
        new ExtractTextPlugin('styles.css'), // 单独打包css
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),//模板
            filename: 'index.html',
            hash: true,
            minify: {
                removeAttributeQuotes: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ["env", "stage-0"]
                    }
                },
                include: __dirname + '/src'
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,// 图片大小 > limit 使用file-loader, 反之使用url-loader
                        outputPath: 'images/'// 指定打包后的图片位置
                    }
                }
            },
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            }
        ]
    }
};
