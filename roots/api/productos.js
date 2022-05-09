const express=require("express");
const ProductoController = require('../../controllers/ProductoController');
const rooter =express.Router();
//const path=require("path");
rooter.route('/all').get(ProductoController.getProductos);
rooter.route('/find/:id').get(ProductoController.getProducto);
rooter.route('/save').post(ProductoController.saveProducto);
rooter.route('/update/:id').put(ProductoController.updateProducto);
rooter.route('/delete').delete(ProductoController.deleteProducto);
                               
module.exports=rooter;