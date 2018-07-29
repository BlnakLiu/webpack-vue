const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包转化成html文件 利用html-webpack-plugin插件
const CleanWebpackPlugin = require('clean-webpack-plugin');//打包时需要删除之前打包的文件  利用clean-webpack-plugin插件
const { VueLoaderPlugin } = require('vue-loader'); //结构插件vue-loader里面的VueLoaderPlugin webpack4.几版本需要声明 
const path = require('path');//
module.exports = {
    mode: 'development',
    entry: ['babel-polyfill','./src/main.js'],//需要打包的js 
          
    output: {
        path: path.join(__dirname,'/dist/'), //打包输出之后的文件
        filename: 'bundle.js' //打包成的js
    },

    module: { //做兼容
      rules: [
          {
              test: /\.css$/,//正则匹配css后缀
              use: ['style-loader','css-loader']  //让css打包兼容需要下载style-loader,css-loader
          },
          {
              test: /\.(svg|jpg|png|gif)$/, //正则匹配图片后缀
              use: ['file-loader'] //打包图片时要下载的插件file-loader
          },
          {
            test: /\.js$/, //正则匹配js文件后缀
            exclude: /(node_modules)/, //不打包node_modules文件夹 
            use: {
              loader: 'babel-loader', //babel-loader 兼容es6所需要的插件
              options: {
                presets: ['env'], //env 建议规定使用的 包含所有es版本 包括es6
                plugins: ['transform-runtime'], //transform-runtime插件避免是用来避免重复打包es6方法的 优化性能
                cacheDirectory:true //默认为flase 要设置为true 也是用来避免重复打包的 优化性能
              }
            }
          },
          {  //打包兼容less
            test: /\.less$/,  
            use: ['style-loader','css-loader','less-loader'] //需要下载'style-loader','css-loader','less-loader'
          },
          { //打包兼容vue
              test: /\.vue$/,
              use: ['vue-loader'] //下载插件vue-loader
          }
      ]  
    },

    devServer: {
        contentBase: './'//运行环境指定的目录
      
    },

    externals: { //externals 就是用来打包时指定不想打包的文件
        'vue': 'Vue',
        'vue-router': 'VueRouter'
    },

    plugins: [
        new CleanWebpackPlugin('dist'), //调用clean-webpack-plugin 每次重新打包时把之前的打包文件删掉
        new VueLoaderPlugin(), //webpack 4.几版本之后需要设置的默认函数
        new HtmlWebpackPlugin({ 
            title: 'hello vue', //打包之后的标题
            // chunks: ['./css/product.css','/js/product.js'],
            template: './index.html' //打包之后生成的模板
        })
    ]



    
};