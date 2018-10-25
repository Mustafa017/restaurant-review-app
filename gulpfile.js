const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

gulp.task('optimize-images', () => {
	imagemin(['img/*.jpg'], 'build/images', {use: [imageminPngquant()]}).then(() => {
		console.log('Images optimized');
	});
})

gulp.task('default',['optimize-images'], ()=>{
	browserSync.init({
		watch: true,
		server: './'
	})
})
