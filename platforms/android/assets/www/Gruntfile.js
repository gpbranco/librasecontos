module.exports = function(grunt) {
  grunt.initConfig({
    nodestatic: {
      server: {
        options: {
          port: 8081,
          keepalive: true,
          base: '.'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-nodestatic');

  grunt.registerTask('dev', ['nodestatic:server']);
};
