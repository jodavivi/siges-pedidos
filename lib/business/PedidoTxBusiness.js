const pedidoTxDao	 		 = require('../dao/PedidoTxDao');  
const pedidoDetalleTxDao	 = require('../dao/PedidoDetalleTxDao');  
const utils 	     = require('../utils/utils'); 

/**
 * @description Función que permite registrar pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.registrarPedido = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Registramos Pedido
		 var oRegistroPedido = {};
		 oRegistroPedido.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroPedido.oData		    = oRequest.oData; 
		 const crearPedidoResponse = await  pedidoTxDao.crearPedido(oRegistroPedido);
		 if(crearPedidoResponse.iCode !== 1){
			throw new Error(crearPedidoResponse.iCode + "||" + crearPedidoResponse.sMessage);
		 }
		 var oPedido = crearPedidoResponse.oData;
		 //Registramos PedidoDetalle
		 if(oRequest.oData.aPedidoDetalle && oRequest.oData.aPedidoDetalle.length > 0){
			oRequest.oData.aPedidoDetalle.forEach(async function(e){
				var oRegistroPedidoDet = {};
				oRegistroPedidoDet.oAuditRequest   = oRequest.oAuditRequest;
				oRegistroPedidoDet.oData		    = e; 
				oRegistroPedidoDet.oData.iPedidoId  = oPedido.Id;
				const crearPedidoDetalleResponse = await  pedidoDetalleTxDao.crearPedidoDetalle(oRegistroPedidoDet);
				if(crearPedidoDetalleResponse.iCode !== 1){
					throw new Error(crearPedidoDetalleResponse.iCode + "||" + crearPedidoDetalleResponse.sMessage);
				} 
			});
			
		 } 
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= oPedido;
		
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
 * @description Función que permite actualizar pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.actualizarPedido = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		//actualizamos el pedido
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarPedidoResponse = await  pedidoTxDao.actualizarPedido(oRegistro);
		if(actualizarPedidoResponse.iCode !== 1){
		   throw new Error(actualizarPedidoResponse.iCode + "||" + actualizarPedidoResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarPedidoResponse.oData; 
	   
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
 * @description Función que permite eliminar Pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.eliminarPedido = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarPedidoResponse = await  pedidoTxDao.eliminarPedido(oRegistro);
			if(eliminarPedidoResponse.iCode !== 1){
				throw new Error(eliminarPedidoResponse.iCode + "||" + eliminarPedidoResponse.sMessage);
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

