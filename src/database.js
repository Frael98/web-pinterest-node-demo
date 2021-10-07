const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/pinteres_tutorial', {
    useNewUrlParse: true
}).then(db => console.log('Conectado a DB Mongo'))
.catch( err => console.log(err))