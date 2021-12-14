const express=require("express");
const ProductoController = require('../controllers/ProductoController');
const rooter =express();
const path=require("path");

rooter.get('/index(.html)?',(req,res)=>{

	res.sendFile(path.join(__dirname,"views","index.html"))
});

rooter.all('*',(req,res)=>{
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
module.exports=rooter;