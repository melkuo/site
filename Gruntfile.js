module.exports = function(grunt) {
	grunt.initConfig({
		paths: {
			dist: 'dist',
			src: 'src',
			temp: 'temp'
		},

		clean: {
			all: ['<%= paths.temp %>', '<%= paths.dist %>'],
			temp: ['<%= paths.temp %>']
		},

		connect: {
			options: {
				port: '8000',
				open: 'http://localhost:8000/index.html',
				base: ['<%= paths.temp %>']
			},
			dev: {
				options: {
					livereload: true
				}
			}
		},

		copy: {
			temp: {
				files: [{
					expand: true,
					cwd: '<%= paths.src %>',
					src: [
						'css/*.css',
						'fonts/*.{eot,svg,ttf,woff}',
						'js/*.js',
						'img/*',
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
						'css/*.css',
						'fonts/*.{eot,svg,ttf,woff}',
						'js/*.js',
						'img/*',
						'*.html'
					],
					dest: '<%= paths.dist %>'
				}]
			}
		},

		sass: {
			options: {
				compass: 'true'
			},
			temp: {	
				options: {
					style: 'expanded'
				},
				files:[{
					expand: true,
					cwd: '<%= paths.src %>/sass',
					src: '**/*.{css,scss}',
					dest: '<%= paths.temp %>/css',
					ext: '.css'
				}]
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files:[{
					expand: true,
					cwd: '<%= paths.src %>/sass',
					src: '**/*.{css,scss}',
					dest: '<%= paths.dist %>/css',
					ext: '.css'
				}]
			}
		},

		sync: {
			temp: {
				files: [{
					cwd: '<%= paths.src %>',
					src: [
						'**',
						'!sass/**/*.scss'
					],
					dest: '<%= paths.temp %>'
				}]
			}
		},

		uglify: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= paths.src %>',
					src: [
						'js/*.js'
					],
					dest: '<%= paths.dist %>'
				}]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['<%= paths.src %>/css/**/*.css'],
				tasks: ['sync']
			},
			fonts: {
				files: ['<%= paths.src %>/fonts/**/*.{eot,svg,ttf,woff}'],
				tasks: ['sync']
			},
			img: {
				files: ['<%= paths.src %>/img/**/*.{eot,svg,ttf,woff}'],
				tasks: ['sync']
			},
			js: {
				files: ['<%= paths.src %>/js/**/*.js'],
				tasks: ['sync']
			},
			sass: {
				files: ['<%= paths.src %>/sass/**/*.{css,scss}'],
				tasks: ['sass:temp']
			},
			html: {
				files: ['<%= paths.src %>/*.html'],
				tasks: ['sync']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'dev'
	]);

	grunt.registerTask('dev', [
		'clean',		// delete temp and dist directories
		'sass:temp',	// compile sass and place in temp directory
		'copy:temp',	// copy the rest of the files from src to temp
		'connect:dev',	// connect to web server
		'watch'			// watch for changes in files
	]);

	grunt.registerTask('build', [
		'clean',		// delete temp and dist directories
		'sass:dist',	// compile sass and place in dist directory
		'copy:dist',	// copy the rest of the files from src to dist
		'uglify'		// minify js
	]);
};