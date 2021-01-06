const pedidoDetalleTxDao = require('../dao/PedidoDetalleTxDao');  
const utils 	     	 = require('../utils/utils'); 
 

/**
 * @description Función que permite registrar el detalle del pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.registrarPedidoDetalle = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 oRequest.oData.aItems.forEach(async function(e){
			//Registramos el detalle del pedido
			var oRegistroPedidoDet = {};
			oRegistroPedidoDet.oAuditRequest  = oRequest.oAuditRequest;
			oRegistroPedidoDet.oData		   = e; 
			oRegistroPedidoDet.oData.iPedidoId= parseInt(req.params.idPedido, 10); 
			const crearPedidoDetalleResponse  = await  pedidoDetalleTxDao.crearPedidoDetalle(oRegistroPedidoDet);
			if(crearPedidoDetalleResponse.iCode !== 1){
			   throw new Error(crearPedidoDetalleResponse.iCode + "||" + crearPedidoDetalleResponse.sMessage);
			} 
		 }); 
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


/**
 * @description Función que permite actualizar el detalle del pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.actualizarPedidoDetalle = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		     = e;  
			console.log(JSON.stringify(e));
			const actualizarPedidoDetalleResponse = await  pedidoDetalleTxDao.actualizarPedidoDetalle(oRegistro);
			if(actualizarPedidoDetalleResponse.iCode !== 1){
				throw new Error(actualizarPedidoDetalleResponse.iCode + "||" + actualizarPedidoDetalleResponse.sMessage);
			}
		}); 
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

/**
 * @description Función que permite eliminar el detalle del pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.eliminarPedidoDetalle = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos 
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarPedidoDetalleResponse = await  pedidoDetalleTxDao.eliminarPedidoDetalle(oRegistro);
			if(eliminarPedidoDetalleResponse.iCode !== 1){
				throw new Error(eliminarPedidoDetalleResponse.iCode + "||" + eliminarPedidoDetalleResponse.sMessage);
			} 
		});
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

