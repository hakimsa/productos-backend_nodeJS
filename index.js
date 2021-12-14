const express = require('express');
const bodyParser = require('body-parser');
const ProductoController = require('./controllers/ProductoController');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8088;
const app = express();
const {logger,logEvents}=require("./midlewares/LogEvents");
const errorHandeler =require("./midlewares/errorHandlers");
const {serv,user,pass,cluster,db}=require("./dbConfig/conf");
const rooter = require('./roots/api/productos');
const roote = require('./roots/root');
const path=require("path");
app.use(bodyParser.urlencoded( {extended:false} ));
app.use(bodyParser.json());
const conexion=(serv+user+pass+cluster+db+"?retryWrites=true");
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
app.use(logger);
//app.use(errorHandeler);
app.use(rooter);

rooter.get('/index(.html)?',(req,res)=>{

	res.sendFile(path.join(__dirname,"views","index.html"))
});
app.all('*',(req,res)=>{
	res.status(404);
if (req.accepts("html")){
	res.sendFile(path.join(__dirname,"views","404.html"))

}else if (req.accepts("json")){

	res.json({

		"error":"404 Not found"});
}else {
	res.type("txt").send("404 Not found");

}
}
);
mongoose.connect(conexion.toString(),
 { useNewUrlParser: true, useFindAndModify:false }).then(
    ()=> {  
	
        app.listen(PORT, ()=>{
        });
	}).catch(
error=>{

	logEvents( error.name +"\t" +"\t"+"Error" +"\t"+error.message+"\t");
});