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
            'js/*.{js,json}',
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
            'img/**',
            '*.html',
            '*.pdf'
          ],
          dest: '<%= paths.dist %>'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.src %>/img',
          src: ['**/*.{gif,jpg,jpeg,png,svg}', '!portfolio/archive/*'],
          dest: '<%= paths.dist %>/img'
        }]
      }
    },

    jade: {
      temp: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: '<%= paths.src %>/views',
          src: ['**/*.jade', '!archive/*.jade'],
          dest: '<%= paths.temp %>',
          ext: '.html'
        }]
      },
      dist: {
        options: {
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: '<%= paths.src %>/views',
          src: ['**/*.jade', '!archive/*.jade'],
          dest: '<%= paths.dist %>',
          ext: '.html'
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
            'js/*.{js,json}'
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
          '<%= paths.src %>/js/**/*.{js,json}',
          '<%= paths.src %>/*.html'
        ],
        tasks: ['sync']
      },
      sass: {
        files: ['<%= paths.src %>/sass/**/*.{sass,scss}'],
        tasks: ['sass:temp']
      },
      jade: {
        files: ['<%= paths.src %>/**/*.jade'],
        tasks: ['jade:temp']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'dev'
  ]);

  grunt.registerTask('dev', [
    'clean',        // delete temp and dist directories
    'jade:temp',    // compile jade and place in temp directory
    'sass:temp',    // compile sass and place in temp directory
    'copy:temp',    // copy the rest of the files from src to temp
    'connect:dev',  // connect to web server
    'watch'         // watch for changes in files
  ]);

  grunt.registerTask('build', [
    'clean',        // delete temp and dist directories
    //'imagemin',     // minify images
    'jade:dist',    // compile jade and place in dist directory
    'sass:dist',    // compile sass and place in dist directory
    'copy:dist',    // copy the rest of the files from src to dist
    'uglify'        // minify js
  ]);
};