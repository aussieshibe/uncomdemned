module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      src: [
        'Gruntfile.js',
        'src/scripts/**'
      ],
      options: {
        config: '.jscsrc',
        fix: false
      }
    },
    browserify: {
      development: {
        src: [
          'src/scripts/**'
        ],
        dest: 'build/scripts/app.js',
        options: {
          browserifyOptions: {debug: true},
          transform: [['babelify', {presets: ['es2015']}]]
        },
      }
    },
    'htmlmin': {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          'expand': true,
          'cwd': 'src/',
          'src': ['**/*.html'],
          'dest': 'build/',
          'ext': '.html'
        }]
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: 'lib/**', dest: 'build/scripts'}
        ]
      }
    },
    'watch': {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.html'],
        tasks: ['watchReload'],
        options: {
          livereload: true
        }
      },
      html: {
        files: 'src/*.html',
        tasks: ['htmlmin']
      }
    },
    'connect': {
      base: 'build',
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jscs');

  // Build-only task
  grunt.registerTask('build', 'jscs', 'browserify', 'htmlmin', 'copy');

  // Default task, builds project and then configures watch
  // for automatic rebuild + live reload on file edits
  grunt.registerTask('default',
    ['jscs', 'browserify', 'htmlmin', 'copy', 'connect', 'watch']);
  // The task to run when watch triggers a reload, does not include connect or
  // watch tasks as these will already be running
  grunt.registerTask('watchReload', ['jscs', 'browserify', 'htmlmin', 'copy']);
};
