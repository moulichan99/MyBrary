if(process.env.NODE_ENV !=='production' )
{
    require('dotenv').config()
}

const express = require('express'); 
const app = express();
const expressLayouts = require('express-ejs-layouts');
 
// A router object is an isolated instance of middleware and routes. 
// You can think of it as a “mini-application,” capable only of performing middleware and routing functions

const indexRouter = require('./routes/index')

// app.set(name, value)
// Assigns setting name to value, where name is one of the properties from the app settings table.

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout')

//app.use() method Mounts the specified middleware function or
//functions at the specified path: the middleware function is executed 
//when the base of the requested path matches path.

// Middleware functions can perform the following tasks:
// Execute any code.
// Make changes to the request and the response objects.

app.use(expressLayouts);
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/',indexRouter); // for large applicaion purpose 
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('server is running');
})


 