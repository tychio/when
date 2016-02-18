module.exports = function (grunt) {
    'use strict';
    var cacheFilesArr = [
        'index.html',
        'js/update.js',
        'js/timer.js',
        'js/tabata.js',
        'js/mod/count.js',
        'js/mod/dial.js',
        'js/mod/sky.js',
        'js/mod/wind.js',
        'css/style.css',
        'font/moztt_regular-webfont.woff',
        'font/moztt_medium-webfont.woff',
        'font/moztt_light-webfont.woff',
        'audio/do.wav',
        'audio/re.wav',
        'audio/disable.wav',
        'audio/enable.wav'
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
            },
            pivotal: {
                files: [
                    'unit/*Spec.js',
                    'js/lib/*.js',
                    'js/*.js'
                ],
                tasks: 'jasmine'
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
                    fallback: ['fallback.html'],
                    verbose: '# Auther Tychio\n# The manifest file is generated by Grunt for App Cache\n',
                    preferOnline: true,
                    master: ['index.html']
                },
                src: cacheFilesArr,
                dist: 'manifest.appcache'
            }
        },
        jasmine: {
            src: ['js/mod/*.js', 'js/tabata.js', 'js/timer.js'],
            options: {
                keepRunner: true,
                outfile: 'unit/runner.html',
                specs: 'unit/*Spec.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-manifest');

    grunt.registerTask('test', ['jasmine', 'watch']);
    grunt.registerTask('default', ['stylus', 'manifest', 'watch']);
};
