require('./database')
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid')
const u4 = uuid.v4
const { format } = require('timeago.js')

//Inicializaciones
const app = express();

app.set('port', 4000);

//Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}))
const storage = multer.diskStorage( {
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, u4() + path.extname(file.originalname));
    }
})
app.use(multer({ storage: storage}).single('image'))

//Variables G.
app.use( (req, res, next) => {
    app.locals.format = format;
    next();
});


//Routes
app.use(require('./routes/index.js'))

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Empezar server

app.listen(app.get('port'), () => {
    console.log(`Escuchando en el puerto ${app.get('port')}`)
})

