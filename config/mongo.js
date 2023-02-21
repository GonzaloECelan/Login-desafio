const mongoose = require('mongoose');

const url = 'mongodb+srv://gonzalo:coder@ecommerce.exk6w0e.mongodb.net/ecommerce?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

mongoose.connect(url,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Conexion exitosa a MD')
    }
})