module.exports = function(grunt) {
	grunt.initConfig({
		paths: {
			dist: 'dist',
			src: 'src',
			temp: 'temp'
		},

		clean: {
			all: ['<%= paths.temp %>', '<%= paths.dist %>']
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
						'img/**',
						'*.html',
						'*.pdf'
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
						'img/**',
						'*.html',
						'*.pdf'
					],
					dest: '<%= paths.dist %>'
				}]
			}
		},

		sass: {
			temp: {	
				options: {
					style: 'expanded'
				},
				files:[{
					expand: true,
					cwd: '<%= paths.src %>/sass',
					src: '**/*.{sass,scss}',
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
					src: '**/*.{sass,scss}',
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
						'!sass/**/*.{sass,scss}' // don't sync because grunt sass will compile
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
			sync: {
				files: [
					'<%= paths.src %>/css/**/*.css',
					'<%= paths.src %>/fonts/**/*.{eot,svg,ttf,woff}',
					'<%= paths.src %>/img/**',
					'<%= paths.src %>/js/**/*.js',
					'<%= paths.src %>/*.html'
				],
				tasks: ['sync']
			},
			sass: {
				files: ['<%= paths.src %>/sass/**/*.{sass,scss}'],
				tasks: ['sass:temp']
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