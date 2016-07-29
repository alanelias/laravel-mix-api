var color = require('gulp-color');

/**
 *  about Alixir
 * @type {{show: module.exports.show}}
 */
module.exports = {
    show: function () {

        console.log(color("By: Alan Elias", "GREEN"));
        console.log(color("Email: alaaelias@gmail.com", "GREEN"));
        console.log(color("LinkedIn: http://www.linkedin.com/in/alanwelias", "GREEN"));

    }
};