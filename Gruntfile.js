'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },
    htmlmin: { 
      dist:{
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      grunt: { 
        files: ['Gruntfile.js'] 
      },
      css: {
        files: 'src/assets/stylesheets/*.css'
      },
      html: {
        files: ['src/*.html'],
        tasks: ['processhtml'],
      },
      sass: {
          files: [
              'assets/sass/*.scss'
          ],
          tasks: ['sass']
      }
    },
    connect: {
        server: {
            options: {
                port: 9009,
                base: 'dist',
                open: true,
                livereload: true,
            }
        }
    },
    cssmin: {
      target: {
        files: {
          'dist/assets/stylesheets/style.min.css': ['src/assets/stylesheets/*.css']
        }
      }
    },
    uglify: {
      target: {
        files: {
          'dist/assets/javascripts/app.min.js': ['bower_components/jquery/dist/jquery.js', 'src/assets/javascripts/*.js', 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js']
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'dist' ,
        message: 'Generated by grunt gh-pages'
      } ,
      src: ['index.html', 'assets/stylesheets/style.css', 'CNAME', 'favicon.ico']
    },
    clean: ['dist/'],
    copy: {
        favicon: {
          src: 'src/favicon.ico',
          dest: 'dist/favicon.ico'
        },
        images: {
          cwd: 'src/assets/images',  // set working folder / root to copy
          src: '*',           // copy all files and subfolders
          dest: 'dist/assets/images',    // destination folder
          expand: true           // required when using cwd
        },
        // Fonts.
        fonts: {
            expand: true,
            filter: 'isFile',
            flatten: true,
            src: ['bower_components/bootstrap-sass/assets/fonts/**', 'src/assets/fonts/**'],
            dest: 'dist/assets/fonts/'
        },
        // Stylesheets
        styles: {
            expand: true,
            cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
            src: ['**/*.scss'],
            dest: 'src/assets/scss/'
        }
      
    },
    sass: {
      options: {
          includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']
      },
      dist: {
          options: {
              outputStyle: 'compressed'
          },
          files: {
              'assets/stylesheets/app.css': 'assets/scss/app.scss'
          }
      }
  },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['clean', 'sass', 'copy', 'processhtml', 'cssmin', 'uglify' ]);
  grunt.registerTask('deploy', ['build', 'htmlmin']);
  grunt.registerTask('serve', ['build','connect:server','watch']);
};