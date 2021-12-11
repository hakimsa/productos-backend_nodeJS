let Producto = new require('./ModeloProducto')
const logEvent=require("./logEvents/LogEvents");

function getProducto(req, res){
    let idProducto = req.params.id
    
    Producto.findById(idProducto).then(
        productoEncontrado => {
            if(!productoEncontrado){
                res.status(404).send( {accion:'get one', mensaje:'No existe el producto con ese id'} )
            }else{
                res.status(200).send( {accion:'get one', data: productoEncontrado})
            }
        }
    ).catch(
        err => {
            res.status(500).send( {accion:'get one', mensaje:'problema el obtener un producto'} )
            logEvent(err);
        }
    )
}

function getProductos(req, res){
    Producto.find().exec().then(
        productos => {
            if(!productos){
       res.status(404).send( {accion:'get all', mensaje:'No hay productos'} )
             logEvent("Get all:404  Not found ");
            }else{
                res.status(200).send( {accion:'get all', data: productos})
                logEvent("Get all:200  ok");
            }
        }
    ).catch(
        err => { 
            res.status(500).send( {accion:'get all', mensaje:'problema al leer los productos:'+err} )
            logEvent(err);
        }
    )

}

function saveProducto(req, res){
    let param = req.body
    console.log(param)
    // res.status(200).send( {accion:"save", data: param})
    let producto = new Producto();
    producto.nombre = param.nombre
    producto.categoria = param.categoria
    producto.precio = param.precio
    producto.descripcion=param.descripcion

    console.log(producto)
    producto.save().then(
        productoGuardado => {
            res.status(200).send( {accion:'save', data: productoGuardado} )
        }
    ).catch(
        err => { 
            res.status(500).send( {accion:'save', mensaje:'problema al guardar un producto:'+err} )
            logEvent(err);
        }
    )
}

function updateProducto(req, res){
    let idCoche = req.params.id
    let param = req.body

    //{new:true}  ===>  hace que devuelva el nuevo producto insertado
    Producto.findByIdAndUpdate(idCoche, param, {new:true}).then(
        productoActualizado => {
            res.status(200).send( {accion:'update', data: productoActualizado} )
        }
    ).catch(
        err => { 
            res.status(500).send( {accion:'update', mensaje:'problema al actualizar un producto:'+err} )
           logEvent(err);
        }
    )
}

function deleteProducto(req, res){
    var idProducto = req.params.id
    Producto.findByIdAndDelete(idProducto).then(
        productoBorrado => {
            res.status(200).send( {accion:'delete', data: productoBorrado} )
        }
    ).catch(
        err => {
            res.status(500).send( {accion:'delete', mensaje:'problema al borrar un coche:'+err} )
            logEvent(err);
        }
    )
}

module.exports = {getProducto: getProducto, getProductos: getProductos, saveProducto: saveProducto, updateProducto: updateProducto, deleteProducto: deleteProducto}
