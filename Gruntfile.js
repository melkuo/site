module.exports = function(grunt) {
	grunt.initConfig({
		paths: {
			dist: 'dist',
			src: 'src',
			temp: 'temp',
			css: 'css',
			fonts: 'fonts',
			images: 'img',
			js: 'js'
		},

		clean: {
			all: ['<%= paths.temp %>', '<%= paths.dist %>'],
			temp: ['<%= paths.temp %>']
		},

		sass: {
			temp: {
				options: {
					compass: 'true'
				},
				files:[{
					expand: true,
					cwd: '<%= paths.src %>/sass',
					src: '**/*.{css,scss}',
					dest: '<%= paths.temp %>/css',
					ext: '.css'
				}]
			}
		},

		watch: {
			sass: {
				files: ['<%= paths.src %>/sass/**/*.{css,scss}',],
				tasks: ['sass']
			}
		},

		copy: {
			temp: {
				files: [{
					expand: true,
					cwd: '<%= paths.src %>',
					src: [
						'<%= paths.css %>/*.css',
						'<%= paths.fonts %>/*.{eot,svg,ttf,woff}',
						'<%= paths.js %>/*.js',
						'<%= paths.images %>/*.{gif,png,jpg,svg}',
						'*.html'
					],
					dest: '<%= paths.temp %>'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= paths.src %>',
					src: [
						'<%= paths.css %>/*.css',
						'<%= paths.fonts %>/*.{eot,svg,ttf,woff}',
						'<%= paths.js %>/*.js',
						'<%= paths.images %>/*.{gif,png,jpg,svg}',
						'*.html'
					],
					dest: '<%= paths.dist %>'
				}]
			},
			sass: {
				files: [{
					expand: true,
					cwd: '<%= paths.temp %>',
					src: [
						'<%= paths.css %>/*.css'
					],
					dest: '<%= paths.dist %>'
				}]
			}
		},

		uglify: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= paths.src %>',
					src: [
						'<%= paths.js %>/*.js'
					],
					dest: '<%= paths.dist %>'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', [
		'sass'
	]);

	grunt.registerTask('dev', [
		'clean',
		'sass',
		'copy:temp',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean',
		'sass',
		'copy:dist',
		'copy:sass', //copy 'sass' from temp to dist
		'uglify',
		'clean:temp'
	]);
};