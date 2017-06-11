var gulp = require("gulp");
var uglify = require('gulp-uglify');//js的压缩
var concat = require('gulp-concat');//文件合并
var imagemin = require('gulp-imagemin');//图片的压缩
var jpegtran = require('imagemin-jpegtran');//图片、、、
var htmlmin = require('gulp-htmlmin');//html压缩为一行
var cleanCSS = require('gulp-clean-css');//css的压缩
var webserver = require('gulp-webserver');//web服务热启动
//var sass = require('gulp-sass');//sass编译
//var plumber = require('gulp-plumber');  //sass

//合并、压缩js文件
gulp.task("default",function(){
	gulp.src("js/*.js")
		.pipe(concat("a.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("done/js"))
})

//压缩图片
gulp.task("imgZip",function(){
	gulp.src("images/*.jpg")
		.pipe(imagemin({
                progressive: true,
                use:[jpegtran()]
        }))
		.pipe(gulp.dest("done/images"))
})

//html文件压缩
gulp.task("htmlZip",function(){
	gulp.src("html/*.html")
		.pipe(htmlmin({collapseWhitespace:true}))
		.pipe(gulp.dest("done/html"))
})
//压缩css
gulp.task("cssZip",function(){
	gulp.src("src/*.css")
		.pipe(cleanCSS())
		.pipe(gulp.dest("css/"))
})
//编译sass
/*gulp.task("editSass",function(){
	gulp.src("src/*.sass")
		.pipe(plumber({
            errorHandler: reportError
        }))
		.pipe(sass())
		.pipe(gulp.dest("css/sass"))
})*/
gulp.task("server",["cssZip"],["htmlZip"],["imgZip"],function(){
	gulp.src("/done")
		.pipe(webserver({
			livereload:true,
			directoryListing:true,
			open:"/html/index.html"
		}))
})