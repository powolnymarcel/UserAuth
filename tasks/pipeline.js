/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and the ! prefix for excluding files.)
 */

// Path to public folder
var tmpPath = '.tmp/public/';

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'js/dependencies/bower_components/bootstrap/dist/css/bootstrap.min.css',
  'styles/**/*.css',
  'login/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/bower_components/jquery/dist/jquery.js',
  'js/dependencies/bower_components/angular/angular.js',
  'js/dependencies/**/*.js',
  'js/public/signup/SignupMod.js',
  'js/public/signup/SignupCtrl.js',
  'js/public/login/LoginMod.js',
  'js/public/login/LoginCtrl.js',
  'js/private/dashboard/DashMod.js',
  'js/private/dashboard/DashCtrl.js',
  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/*.js',
  'login/**/*.js',

  // Use the "exclude" operator to ignore files
  // '!js/ignore/these/files/*.js'
  '!js/dependencies/bower_components/jquery/src/**/*.js',
  '!js/dependencies/bower_components/bootstrap/js/**/*.js',
  '!js/dependencies/bower_components/bootstrap/grunt/**/*.js',
  '!js/dependencies/bower_components/bootstrap/Gruntfile.js',
  '!js/dependencies/bower_components/bootstrap/package.js',
  '!js/dependencies/bower_components/bootstrap/dist/js/*.min.js',
  '!js/dependencies/bower_components/bootstrap/dist/js/npm.js',
  '!js/dependencies/bower_components/angular/*.min.js',
  '!js/dependencies/bower_components/angular/index.js',
  '!js/dependencies/bower_components/jquery/dist/*.min.js'


];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(transformPath);
module.exports.jsFilesToInject = jsFilesToInject.map(transformPath);
module.exports.templateFilesToInject = templateFilesToInject.map(transformPath);

// Transform paths relative to the "assets" folder to be relative to the public
// folder, preserving "exclude" operators.
function transformPath(path) {
  return (path.substring(0,1) == '!') ? ('!' + tmpPath + path.substring(1)) : (tmpPath + path);
}
