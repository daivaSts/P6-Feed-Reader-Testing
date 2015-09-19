module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		concat: {
		    dist: {
		     	src: ['dist/css/icomoon.min.css', 'dist/css/normalize.min.css', 'dist/css/style.min.css'],
		      	dest: 'dist/css/built.css',
		    },
		  },
		jshint: {
			options: {
				"eqeqeq": true
			},
			all: [
			'src/js/*.js'
			]
		},
	    htmlmin: {
	        options: {
	            cdata: true
	        },
	        dist: {
			    options: {
			        removeComments: true,
			        collapseWhitespace: true
		      	},
	            files: {
	                'dist/index.html': 'src/index.html'
	            }
	        }
	    },
	    uglify: {
    		my_target: {
      			files: {
        			'dist/js/app.min.js': ['src/js/app.js']
      			}
    		}
  		},
  		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'src/css/',
					src: ['icomoon.css', 'normalize.css', 'style.css'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		}
	});

	grunt.registerTask("default", [
		"jshint",
		"uglify",
		'htmlmin',
		'cssmin',
		'concat'
		]);
};