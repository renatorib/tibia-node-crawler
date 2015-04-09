'use strict';
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-replace');

  grunt.initConfig({
    replace: {
      module: {
        options: {
          patterns: [
            {match: 'Module', replacement: "<%= grunt.config.get('nameUpper') %>"},
            {match: 'module', replacement: "<%= grunt.config.get('nameLower') %>"},
            {match: 'ModuleParser', replacement: "<%= grunt.config.get('nameUpper') %>Parser"},
            {match: 'ModuleRequester', replacement: "<%= grunt.config.get('nameUpper') %>Requester"},
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['.bp/module/*', '.bp/module/**/*'],
            dest: "src/modules/<%= grunt.config.get('nameLower') %>/"
          }
        ]
      }
    },
    'release-it': {
      options: {
        pkgFiles: ['package.json'],
        commitMessage: 'Release %s',
        tagName: '%s',
        tagAnnotation: 'Release %s',
        buildCommand: false
      }
    }
  });

  grunt.registerTask('create-module', function(name){
    grunt.config.set('nameLower', name.toLowerCase());
    grunt.config.set('nameUpper', name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1));
    grunt.task.run('replace:module');
  });

};
