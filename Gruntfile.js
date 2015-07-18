module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		concat: {   
			dist: {
				src: [
					'js/default.js', // All JS in the libs folder
					'js/jnav.js'  // This specific file
				],
				dest: 'js/build/production.js',
			}
		},
		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
			}
		},
		watch: {
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['css/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/build/default.css': 'css/default.scss'
				}
			} 
		},		
		autoprefixer: {
			dist: {
				files: {
					'css/build/default.css': 'css/build/default.css'
				}
			}
		}
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    //grunt.registerTask('default', ['concat']);
	//grunt.registerTask('default', ['concat', 'uglify', 'watch', 'sass']);
	//grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'watch']);
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer']);

};