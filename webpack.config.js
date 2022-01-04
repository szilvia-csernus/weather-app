module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: './main.js'
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_mudules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/react']
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '*']
    }
};