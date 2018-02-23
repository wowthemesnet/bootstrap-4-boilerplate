# Bootstrap 4 Beta Boilerplate
A [Bootstrap](https://getbootstrap.com/) 4.0 (Beta 3) boiler plate with [sass](http://sass-lang.com/), concatenation, minification, autoprefixer, [Browsersync](https://www.browsersync.io/), hot reloading and sourcemaps all runned by [Gulp](https://gulpjs.com/)

![bootstrap logo](https://user-images.githubusercontent.com/10498583/31125543-e2a88c2c-a848-11e7-87b0-d20ea38d41d0.jpg)
![sass logo](https://user-images.githubusercontent.com/10498583/31125541-e2a732e6-a848-11e7-959d-7d7b0c138124.jpg)
![gulp logo](https://user-images.githubusercontent.com/10498583/31125542-e2a78b88-a848-11e7-8ac5-c396f46e811f.jpg)
![browsersync logo](https://user-images.githubusercontent.com/10498583/31125540-e2a6eed0-a848-11e7-817a-69c5619f772a.jpg)

## Beginners

- [Download](https://github.com/wowthemesnet/bootstrap-4-boilerplate/archive/master.zip) 
- Extract and copy "docs" folder, this is the only one you'll need.
- Get Started:
- open index.html in your browser to visit the homepage
- assets/css/theme.css - add/edit your custom CSS
- assets/js/theme.js - add/edit your custom JS


## Developers
```
# 1 Clone this repo
git clone https://github.com/wowthemesnet/bootstrap-4-boilerplate.git

# 2 Navigate into the repo directory
cd bootstrap-4-boilerplate

# 3 Install all node packages
npm install

# 4 Get started
gulp serve - starts localhost server with browser-sync, watches html sass js with hot reloading
gulp - minify css/js and builds your app into the docs directory, ready for production
```

## Requirements
This project requires you to have a installation of [nodejs](https://nodejs.org/en/) with [npm](https://www.npmjs.com/get-npm)
This project also requires you to have global installations of [gulp](http://gulpjs.com/).
```
# Install gulp globally
npm install -g gulp
```

## Gulp commands
**gulp serve**

The gulp serve command starts a local Browsersync server that serves your files in the browser.
It automatically reloads the current page when changing html, sass and js files.
The output of all sass files goes to main.css.
All js files are concatenated into main.js.
You can access the project live in development with other devices on the same network. Go to the "External" address specified by Browsersync in the terminal in the browser of your device.
```
gulp serve
```

**gulp (build)**

The default gulp command is set to creating a "docs" directory with a production version of the project, ready to be deployed.
It minifies and renames js/css assets as well as cleaning the old "docs" directory. CSS is auto prefixed for the latest two browser versions.
```
gulp
```

**gulp concatScripts**

The gulp concatScripts command combines the specified js resources into main.js.
You can add new js files to this command on line 16 in gulpfile.js
You might want to run concatScripts once separately after adding new js files.
```
gulp concatScripts
```

## Overwriting Bootstrap sass variables
You can overwrite specific bootstrap sass variables by uncommenting lines in assets/css/1-frameworks/bootstrap/bootstrap-user-variables.scss

## PHP Support
If you need a server with PHP support you can use the project with [MAMP Pro](https://www.mamp.info/en/mamp-pro/) or similar.
* Place the project folder in the htdocs folder
* Create a new host in the hosts panel of MAMP Pro and choose the project folder as the document root
* Enable Symlinks settings in the "Extended" tab of the host configuration
* On line 59 in gulpfile.js change the browserSync.init function to the following:
```
browserSync.init({
proxy: "http://name-of-your-mamp-host:8888",
open: "external"
});
```
* Start the MAMP services and run "gulp serve" as before
