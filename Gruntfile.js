module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        watch: {
            style: {
                files: 'css/*.styl',
                tasks: 'stylus'
            }
        },
        stylus: {
            compile: {
                options: {
                    linenos: false,
                    compress: true,
                    banner: '\/*\n Tychio [code@tychio.net]\n 2013.09.23\n*\/\n'
                },
                files: {
                    'css/style.css': [
                        'css/reset.styl',
                        'css/tools.styl',
                        'css/skin.styl'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['stylus', 'watch']);
};