const express = require('express');
const bodyParser = require('body-parser');
const ProductoController = require('./ProductoController');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8888;
const app = express();

app.use(bodyParser.urlencoded( {extended:false} ));
app.use(bodyParser.json());


   // midle ware Ad1234
app.use( (req, res, next) => {
	//permitimos que las peticiones se puedan hacer desde cualquier sitio
	res.header('Access-Control-Allow-Origin', '*')
	//res.header('Access-Control-Allow-Origin', '192.168.0.11')
	// configuramos las cabeceras que pueden llegar
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
	// configuramos los métodos que nos pueden llegar
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
	next(); // para que se salga de esta función
})


// midle ware



app.get('/producto/:id', ProductoController.getProducto);
app.get('/productos', ProductoController.getProductos);
app.post('/producto', ProductoController.saveProducto);
app.put('/producto/:id', ProductoController.updateProducto);
app.delete('/producto/:id', ProductoController.deleteProducto);


                                         //name base datos

mongoose.connect('mongodb+srv://hakim:******@cluster0-y69ki.mongodb.net/productos?retryWrites=true',
 { useNewUrlParser: true, useFindAndModify:false }).then(
	
    () => {  
        console.log('Conexión con mongo correcta') 
        app.listen(PORT, ()=>{
            console.log('El servidor se arranco correctamente')
        })
    },err => { console.log('fallo en la base de datos:'+err) }
)



