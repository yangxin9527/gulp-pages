
const {src,dest,parallel,series,watch } = require('gulp');
const del = require('del')
const LoadPlugins = require('gulp-load-plugins');

const BrowserSync = require('browser-sync')

const bs = BrowserSync.create();

const plugins = LoadPlugins();
//当前命令行
const cwd = process.cwd();
let config = {
  // 默认配置
  build:{
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
  }

};

try{
  config=Object.assign({},config,require(`${cwd}/pages.config.js`))
}catch(e){

}


const clean =()=>{
    return del([config.build.dist,config.build.temp])
}
const style =()=>{
    return src(config.build.paths.styles,{base:config.build.src , cwd:config.build.src})
        .pipe(plugins.sass())
        .pipe(dest(config.build.temp))
}

const scripts =()=>{
    return src(config.build.paths.scripts,{base:config.build.src , cwd:config.build.src})
        .pipe(plugins.babel({presets:[require('@babel/preset-env')]}))
        .pipe(dest(config.build.temp))
}
const page =()=>{
    return src(config.build.paths.pages,{base:config.build.src , cwd:config.build.src})
    .pipe(plugins.swig({ data:config.data, defaults:{ cache: false } }))
        .pipe(dest(config.build.temp))
}
const image =()=>{
    return src(config.build.paths.images,{base:config.build.src , cwd:config.build.src})
    .pipe(plugins.imagemin())
        .pipe(dest(config.build.dist))
}

const fonts =()=>{
    return src(config.build.paths.fonts,{base:config.build.src , cwd:config.build.src})
        .pipe(dest(config.build.dist))
}
const extra =()=>{
    return src('**',{base:config.build.public, cwd:config.build.public})
        .pipe(dest(config.build.dist))
}
const useref =()=>{
    return src(config.build.paths.pages,{base:config.build.temp , cwd :config.build.temp})
        .pipe(plugins.useref({
            searchPath:[config.build.temp,'.']
        }))
        .pipe(plugins.if(/\.js$/,plugins.uglify()))
        .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
        .pipe(plugins.if(/\.html$/,plugins.htmlmin({
            collapseWhitespace:true,
            minifyJS:true,
            minifyCSS:true
        })))
        .pipe(dest(config.build.dist))
}
const serve=()=>{
    watch(config.build.paths.styles ,{base:config.build.src , cwd:config.build.src} ,style)
    watch(config.build.paths.scripts,{base:config.build.src , cwd:config.build.src},scripts)
    watch(config.build.paths.pages,{base:config.build.src , cwd:config.build.src},page)
    watch([
        config.build.paths.images,
        config.build.paths.fonts,
    ],{cwd:config.build.src},bs.reload)

    watch([
      config.build.public,
  ],bs.reload)

    bs.init({
        // open:false,
        port:2080,
        files:config.build.temp+'/**',
        server:{
            baseDir:[config.build.temp,config.build.src,config.build.public],
            routes:{
                '/node_modules':'node_modules'
            }
        }
    })
}

const compile = parallel(page,style,scripts);
const build = series(
    clean,
    parallel(
        series(compile,useref),
        image,
        fonts,
        extra
    )
    ,useref
) ;
const develop = series(clean,compile,serve)
module.exports={
    build,
    develop,
    clean,
}
