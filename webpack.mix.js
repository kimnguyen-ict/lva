const path = require('path');
const {mix} = require('laravel-mix');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const buildDir = process.env.BUILD_DIR;
const buildPath = './public/' + buildDir + '/';
const resourcePath = 'resources/' + buildDir + '/';
mix
    .setPublicPath(buildPath)
    .setResourceRoot('/' + buildDir + '/')
    .js(resourcePath + '/js/app.js', 'js')
    .sass(resourcePath + '/sass/app.scss', 'css')
    .extract(['vue', 'vue-router', 'vuex'])
    .webpackConfig({
        output: {
            publicPath: './' + buildDir + '/',
            chunkFilename: 'js/[name].[chunkhash].js',
        },
        resolve: {
            alias: {
                package: path.resolve(__dirname, './package.json'),
                assets: path.resolve(__dirname, resourcePath + '/js/assets'),
                views: path.resolve(__dirname, resourcePath + '/js/views/'),
                'vuex-store': path.resolve(__dirname, resourcePath + '/js/store'),
                'plotly.js': 'plotly.js/dist/plotly'
            }
        }
    });
if (mix.config.inProduction) {
    mix.version()
} else {
    mix.sourceMaps()
}
