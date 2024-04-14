const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const dotenv = require('dotenv')
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'

    // Load environment variables from the appropriate .env file
    const envPath = isProduction ? '.env.production' : '.env.development'
    const envVars = dotenv.config({ path: envPath }).parsed

    return {
        entry: './server.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            chunkFilename: '[name].[contenthash].js', // Separate output files for each chunk
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(envVars),
            }),
            new CleanWebpackPlugin(),
        ],
        externals: [nodeExternals()],
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                    parallel: true,
                }),
            ],
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                        priority: 20,
                    },
                },
            },
        },
    }
}
