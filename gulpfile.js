const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('default', ()=>{
	browserSync.init({
		watch: true,
		open: false,
		server: './'
	})
})