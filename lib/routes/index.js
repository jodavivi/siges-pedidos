const express = require('express');
const router = express.Router();

const pedidoRxBusiness        = require('../business/PedidoRxBusiness');  
const pedidoTxBusiness        = require('../business/PedidoTxBusiness'); 
const pedidoDetalleRxBusiness = require('../business/PedidoDetalleRxBusiness');  
const pedidoDetalleTxBusiness = require('../business/PedidoDetalleTxBusiness');   
const pedidoEstadoTxBusiness = require('../business/PedidoEstadoTxBusiness'); 


module.exports = function(){

    //pedido
    router.post('/', pedidoTxBusiness.registrarPedido); 
    router.put('/:id', pedidoTxBusiness.actualizarPedido); 
    router.delete('/', pedidoTxBusiness.eliminarPedido);  
    router.get('/', pedidoRxBusiness.consultarPedido); 
    router.post('/estado', pedidoEstadoTxBusiness.registrarEstadoPedido); 

    //pedido_detalle
    router.post('/detalle/:idPedido', pedidoDetalleTxBusiness.registrarPedidoDetalle); 
    router.put('/detalle/:idPedido', pedidoDetalleTxBusiness.actualizarPedidoDetalle); 
    router.delete('/detalle', pedidoDetalleTxBusiness.eliminarPedidoDetalle);  
    router.get('/detalle', pedidoDetalleRxBusiness.consultarPedidoDetalle); 
    
    return router;
}

