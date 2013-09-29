module.exports = function (grunt) {
    'use strict';
    var cacheFilesArr = [
        'index.html',
        'js/timer.js',
        'css/style.css',
        'font/moztt_regular-webfont.woff',
        'font/moztt_medium-webfont.woff',
        'font/moztt_light-webfont.woff'
    ];
    grunt.initConfig({
        watch: {
            style: {
                files: 'css/*.styl',
                tasks: 'stylus'
            },
            cache: {
                files: cacheFilesArr,
                tasks: 'manifest'
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
                        'css/skin.styl'
                    ]
                }
            }
        },
        manifest: {
            cache: {
                options: {
                    basePath: '/opportunity/',
                    cache: cacheFilesArr,
                    fallback: ['/ /fallback.html'],
                    verbose: '# Auther Tychio\n# The manifest file is generated by Grunt for App Cache\n',
                    preferOnline: true,
                    master: ['index.html']
                },
                src: cacheFilesArr,
                dist: 'manifest.appcache'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-manifest');

    grunt.registerTask('default', ['stylus', 'manifest', 'watch']);
};