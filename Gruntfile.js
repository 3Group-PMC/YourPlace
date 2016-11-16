/**
 * Created by Daniel on 24/07/2016.
 */
module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({

        htmlmin: {                                     // Task
            build: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'build/index.html': 'app/index.html',     // 'destination': 'source'

                }
            }
        },
        'gh-pages': {
            options: {
                base: 'build'
            },
            src: '**/*'
        },
        copy: {
            build: {
                cwd: 'app',

                src: [ 'js/*', 'fonts/*/**', 'favicon.ico', 'data/*' ],
                dest: 'build',
                expand: true
            }
        },clean: {
            build: {
                src: [ 'build' ]
            }
        },uglify: {
            build: {
                options: {

                    mangle: true,
                   compress:{ drop_console: true}
                },

                files: {
                    'build/app.js': 'app/app.js',
                    'build/dojo.js': 'app/dojo.js',


                }
            }
        },cssmin: {
            build: {
                files: {
                    'build/app.css': [ 'app/app.css' ],
                    'build/css/calcite-bootstrap.css': ['app/css/calcite-bootstrap.css'],
                    'build/css/calcite-maps-arcgis.css': ['app/css/calcite-maps-arcgis.css']
                }
            }
        },

        connect: {
        server: {
            options: {
                port: 4000,
                    base: 'build',
                    hostname: 'localhost',
                    keepalive: true
            }
        }
    }

    });

    // load the tasks

    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // define the tasks
    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean', 'copy','uglify','cssmin', 'htmlmin' ]
    );

    grunt.registerTask(
        'server',
        'Initialize the server for the view of the app at /build',
        [ 'build', 'connect' ]
    );

    grunt.registerTask(
        'publish',
        'Gets a build off the project and publish it in github Pages',
        [ 'build', 'gh-pages']
    );
};