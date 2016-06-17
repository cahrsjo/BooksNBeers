var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 3000;

var nav = [{
    Link: '/Books',
    Text: 'Books'
},{
    Link: '/Beers',
    Text: 'Beers'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var beerRouter = require('./src/routes/beerRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'library', resave: true, saveUninitialized: true}));
require('./src/config/passport')(app);

app.set('views', 'src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Beers', beerRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello title',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Beers',
            Text: 'Beers'
        }]
    });
});

app.listen(port, function() {
    console.log('Running at port ' + port);
});
