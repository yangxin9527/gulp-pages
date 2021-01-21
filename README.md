# jier-pages


> Awesome node module

## Installation

```shell
$ npm install jier-pages

# or yarn
$ yarn add jier-pages
```

## strat API


```shell
$ jier-pages develop //启动项目
$ 
$ jier-pages build //打包压缩
$ 
$ jier-pages clean //清除无用文件
```
#### options

可通过在项目根目录创建pages.config.json 

```javascript
// pages.config.json 
module.exports={
    build:{ //自定义目录结构 
        'src':'src',
        'dist':'dist',
        'temp':'.temp',
        'public':'public',
        paths:{
          'styles':'assets/**/*.scss',
          'scripts':'assets/**/*.js',
          'pages':'*.html',
          'images':'assets/images/**',
          'fonts':'assets/fonts/**',
        }
      },
    data:{// 可根据需要传递项目信息
        // menus:[],
        // pkg:require('./package.json'),
        // date:new Date()
    }
   
}


```

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; yangxin <364332625@qq.com>

