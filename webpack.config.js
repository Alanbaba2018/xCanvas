const path = require('path');
module.exports = {
    // mode: 'development',
    entry: "./index.ts",
    output: {
        library: 'xCanvas',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: "index.js",
        path: path.resolve(__dirname,'./')
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [{ 
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
};