const pedidoDetalleRxDao	= require('../dao/PedidoDetalleRxDao'); 
const utils 		 		= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar el detalle del pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.consultarPedidoDetalle = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
 
		 var oFiltroPedidoDet = {}; 
		 oFiltroPedidoDet.iPedidoId   = req.query.iPedidoId;
		 oFiltroPedidoDet.iId 	  	  = req.query.iId; 
		 var consultarPedidoDetalleResponse =  await pedidoDetalleRxDao.consultarPedidoDetalle(oFiltroPedidoDet);
		 if(consultarPedidoDetalleResponse.iCode !== 1){
			throw new Error(consultarPedidoDetalleResponse.iCode + "||" + consultarPedidoDetalleResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarPedidoDetalleResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 