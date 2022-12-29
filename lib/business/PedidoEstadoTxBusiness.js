const pedidoEstadoTxDao	 	= require('../dao/PedidoEstadoTxDao');  
const utils 	     = require('../utils/utils'); 

/**
 * @description Función que permite registrar el estado del pedido
 * @creation David Villanueva 22/07/2022
 * @update
 */
exports.registrarEstadoPedido = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req);  
		console.log("AAAAAAAAAAAAAAAAAAAAA");
		  //Registramos PedidoDetalle
		  if(oRequest.oData.aPedidoEstado && oRequest.oData.aPedidoEstado.length > 0){
			oRequest.oData.aPedidoEstado.forEach(async function(e){
				 // Registramos el estado del Pedido segun tipo de venta
				var oRegistroPedidoEstado = {};
				oRegistroPedidoEstado.oAuditRequest  = oRequest.oAuditRequest;
				oRegistroPedidoEstado.oData		  = {}; 
				oRegistroPedidoEstado.oData.iPedidoId 	= e.iPedidoId;
				oRegistroPedidoEstado.oData.iCodEstado = e.iCodEstado;
				oRegistroPedidoEstado.oData.sEstado 	= e.sEstado; 
				const crearPedidoEstadoResponse = await  pedidoEstadoTxDao.crearPedidoEstado(oRegistroPedidoEstado);
				if(crearPedidoEstadoResponse.iCode !== 1){
					throw new Error(crearPedidoEstadoResponse.iCode + "||" + crearPedidoEstadoResponse.sMessage);
				}
			}); 
		 } 
		  
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK'; 
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};