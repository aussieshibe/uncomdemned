module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      src: [
        'src/scripts/**/*.js'
      ],
      util: [
        'Gruntfile.js'
      ],
      options: {
        config: '.jscsrc',
        fix: false
      }
    },
    browserify: {
      development: {
        src: [
          'src/scripts/**/*.js'
        ],
        dest: 'build/scripts/app.js',
        options: {
          browserifyOptions: {debug: true},
          transform: [['babelify', {presets: ['es2015']}]]
        }
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
          {
            expand: true,
            cwd: 'src/',
            src: 'lib/**',
            dest: 'build/scripts'
          },
          {
            expand: true,
            cwd: 'src/',
            src: 'mesh/**',
            dest: 'build/gamedata/'
          },
          {
            expand: true,
            cwd: 'src/',
            src: 'collider/**',
            dest: 'build/gamedata/'}
        ]
      }
    },
    'watch': {
      scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['watchRebuildScripts']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['watchRebuildHtml']
      },
      libs: {
        files: ['src/lib/**'],
        tasks: ['watchRebuildLib']
      },
      util: {
        files: ['Gruntfile.js'],
        tasks: ['watchRebuildUtil']
      },
      options: {
        livereload: true
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

  // Build-all task
  grunt.registerTask('build', ['jscs', 'browserify', 'htmlmin', 'copy']);

  // Default task, builds project and then configures watch
  // for automatic rebuild + live reload on file edits
  grunt.registerTask('default',
    ['build', 'connect', 'watch']);

  // Rebuilds all scripts and copies to build
  grunt.registerTask('watchRebuildScripts', ['jscs:src', 'browserify']);
  // Minifies + copies HTML to build
  grunt.registerTask('watchRebuildHtml', ['htmlmin']);
  // Copies static libs to build
  grunt.registerTask('watchRebuildLibs', ['copy']);
  // Does any required buildsteps for util files (e.g. Gruntfile.js)
  grunt.registerTask('watchRebuildUtil', ['jscs:util']);

};
