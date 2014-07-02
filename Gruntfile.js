module.exports = function(grunt) {
	grunt.initConfig({
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					compass: 'true'
				},
				files:[{
					expand: true,
					cwd: 'sass',
					src: '**/*.{css,scss}',
					dest: 'css',
					ext: '.css'
				}]
			}
		},

		watch: {
			sass: {
				files: ['sass/**/*.{css,scss}',],
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', [
		'sass'
	]);

	grunt.registerTask('dev', [
		'sass',
		'watch'
	]);
};