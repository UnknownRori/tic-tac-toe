const path = require('path');

module.exports = {
    mode: 'development',
    devtool: "source-map",
    entry: './src/index.ts',
    output: {
        filename: 'tic-tac-toe.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],
    },
};
