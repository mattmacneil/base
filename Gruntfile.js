module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'css/sass',
          src: ['**/*.scss'],
          dest: 'css/styles',
          ext: '.css'
      }]
      }
    },

    postcss: {
      options: {

        map: {
            inline: false,
            annotation: 'css/sass/maps/'
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 10 versions'}),
          require('cssnano')()
        ]
      },
      dist: {
        src: 'css/styles/*.css'
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass','postcss']
      }
    },

  php: {
    watch: {
      options: {
        port: 5000,
        keepalive: true,
        open: true
      }
    }
  }



  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['php:watch', 'watch']);
};