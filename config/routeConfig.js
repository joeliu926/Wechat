/**
 * Created by JoeLiu on 2017-10-23.
 */

function registor(app) {
    //app.use(require('../security/authentication.js'));
    var requires = [
        {
            root:"/customer",
            require: '../routes/customerList.js'
        },
        {
            root:"/customer",
            require: '../routes/customerDetail.js'
        },
        {
            root:"/customer",
            require: '../routes/photoList.js'
        },
        { 
            root:"/api",
            require:"../routes/api.js"
        },
        {
            root:"/msg",
            require:"../routes/message.js"
        }
    ];

    requires.forEach(function(item, index) {
        app.use(item.root, require(item.require));
    });
}

module.exports = registor;