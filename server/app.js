const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = {
    app: function() {
        const app = express();

        const publicPath = express.static('dist');
        const indexPath = path.join(__dirname, '../dist/index.html');

        app.use(bodyParser.json());
        app.use(publicPath);
        app.get('/', function(req, res) {
            res.sendFile(indexPath);
        });

        // add session handler
        // Routes for api requests
        app.get('/test', function(req, res) {
            res.json({data: 'test'});
        });

        return app;
    }
};
