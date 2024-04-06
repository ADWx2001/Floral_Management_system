module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var project = {
    js: {
      hint: [
        'Gruntfile.js',
        'bin/**/*',
        'lib/**/*.js',
        'test/**/*.js'
      ],

      test: [
        'test/**/*.js'
      ],

      dist: {
        src: ['lib/chunks.js'],
        dest: 'dist/chunks.min.js'
      }
    },

    docs: {
      build: 'docco --output site/docs lib/chunks.js'
    },

    sass: {
      src: 'assets/sass/style.scss',
      dest: 'assets/css/style.css'
    },

    site: {
      build: 'geno'
    }
  };

  grunt.initConfig({
    project: project,

    jshint: {
      options: {
        shadow: true
      },

      files: project.js.hint
    },

    simplemocha: {
      options: {
        ui: 'bdd',
        reporter: 'spec'
      },

      all: {
        src: project.js.test
      }
    },

    uglify: {
      options: {
        report: 'gzip'
      },

      dist: {
        src: project.js.dist.src,
        dest: project.js.dist.dest,
      }
    },

    sass: {
      build: {
        options: {
          style: 'compressed'
        },

        files: {
          '<%= project.sass.dest %>' : '<%= project.sass.src %>'
        }
      }
    },

    shell: {
      docs: {
        options: {
          stdout: true
        },
        command: project.docs.build
      },

      site: {
        options: {
          stdout: true
        },
        command: project.site.build
      }
    },

    copy: {
      site: {
        files: [{
          expand: true,
          cwd:'site/',
          src: ['**'],
          dest: '../gh-pages/'
        }]
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('dist', ['test', 'uglify']);
  grunt.registerTask('site', ['sass', 'shell:docs', 'shell:site', 'copy']);
  grunt.registerTask('default', ['test']);

};
