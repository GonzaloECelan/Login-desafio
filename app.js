const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const mongoDB = require('./config/mongo');

const sessionRout = require('./routes/session.routes');



const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + './public'))
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'secret-51',
    store: MongoStore.create({
        ttl:1000,
        mongoUrl: 'mongodb+srv://gonzalo:coder@ecommerce.exk6w0e.mongodb.net/session?retryWrites=true&w=majority'
    })
}))



app.use('/api/sessions',sessionRout);

app.listen(PORT, ()=>{
    console.log('se levanto servidor')
})

