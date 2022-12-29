const pedidoTxDao	 		 = require('../dao/PedidoTxDao');  
const pedidoDetalleTxDao	 = require('../dao/PedidoDetalleTxDao');  
const pedidoEstadoTxDao	 	= require('../dao/PedidoEstadoTxDao');  
const utils 	     = require('../utils/utils'); 

/**
 * @description Función que permite registrar pedido
 * @creation David Villanueva 22/07/2022
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
		 if(oRegistroPedido.oData.sClienteNumIdentificacion === undefined ||
				oRegistroPedido.oData.sClienteNumIdentificacion === null ||
					oRegistroPedido.oData.sClienteNumIdentificacion === ""){
						oRegistroPedido.oData.sClienteNumIdentificacion = "00000000";
							oRegistroPedido.oData.sClienteNombre		= "Varios";
		 }
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
		 // Registramos el estado del Pedido segun tipo de venta
		 var oRegistroPedidoEstado = {};
		 oRegistroPedidoEstado.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroPedidoEstado.oData		  = {}; 
		 oRegistroPedidoEstado.oData.iPedidoId 	= oPedido.Id;
		 oRegistroPedidoEstado.oData.iCodEstado = 1;
		 oRegistroPedidoEstado.oData.sEstado 	= "Pendiente";
		 const crearPedidoEstadoResponse = await  pedidoEstadoTxDao.crearPedidoEstado(oRegistroPedidoEstado);
		 if(crearPedidoEstadoResponse.iCode !== 1){
			throw new Error(crearPedidoEstadoResponse.iCode + "||" + crearPedidoEstadoResponse.sMessage);
		 }
		 // iTipoPedido = 1---> Pedido Pagado
		 if(oRequest.oData.iTipoPedido === 1 || oRequest.oData.iTipoPedido === 2){
			var oRegistroPedidoEstado = {};
			oRegistroPedidoEstado.oAuditRequest  = oRequest.oAuditRequest;
			oRegistroPedidoEstado.oData		  = {}; 
			oRegistroPedidoEstado.oData.iPedidoId 	= oPedido.Id;
			oRegistroPedidoEstado.oData.iCodEstado = 2;
			oRegistroPedidoEstado.oData.sEstado 	= "Pagado";
			const crearPedidoEstadoResponse = await  pedidoEstadoTxDao.crearPedidoEstado(oRegistroPedidoEstado);
			if(crearPedidoEstadoResponse.iCode !== 1){
			   throw new Error(crearPedidoEstadoResponse.iCode + "||" + crearPedidoEstadoResponse.sMessage);
			}
		 }

		 // iTipoPedido = 2---> Pedido Pagado y Despachado
		 if(oRequest.oData.iTipoPedido === 2  || oRequest.oData.iTipoPedido === 3){ 
			var oRegistroPedidoEstado = {};
			oRegistroPedidoEstado.oAuditRequest  = oRequest.oAuditRequest;
			oRegistroPedidoEstado.oData		  = {}; 
			oRegistroPedidoEstado.oData.iPedidoId 	= oPedido.Id;
			oRegistroPedidoEstado.oData.iCodEstado = 3;
			oRegistroPedidoEstado.oData.sEstado 	= "Despachado";
			const crearPedidoEstadoResponse = await  pedidoEstadoTxDao.crearPedidoEstado(oRegistroPedidoEstado);
			if(crearPedidoEstadoResponse.iCode !== 1){
			   throw new Error(crearPedidoEstadoResponse.iCode + "||" + crearPedidoEstadoResponse.sMessage);
			}
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
 * @creation David Villanueva 22/07/2022
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

		//Actualizamps el PedidoDetalle
		if(oRequest.oData.aPedidoDetalle && oRequest.oData.aPedidoDetalle.length > 0){
			oRequest.oData.aPedidoDetalle.forEach(async function(e){
				if(e.sAccion === "C"){
					var oRegistroPedidoDet = {};
					oRegistroPedidoDet.oAuditRequest   = oRequest.oAuditRequest;
					oRegistroPedidoDet.oData		    = e; 
					oRegistroPedidoDet.oData.iPedidoId  = parseInt(req.params.id, 10); 
					const crearPedidoDetalleResponse = await  pedidoDetalleTxDao.crearPedidoDetalle(oRegistroPedidoDet);
					if(crearPedidoDetalleResponse.iCode !== 1){
						throw new Error(crearPedidoDetalleResponse.iCode + "||" + crearPedidoDetalleResponse.sMessage);
					} 
				}
				if(e.sAccion === "U"){
					var oRegistroPedidoDet = {};
					oRegistroPedidoDet.oAuditRequest   = oRequest.oAuditRequest;
					oRegistroPedidoDet.oData		    = e;  
					const actualizarPedidoDetalleResponse = await  pedidoDetalleTxDao.actualizarPedidoDetalle(oRegistroPedidoDet);
					if(actualizarPedidoDetalleResponse.iCode !== 1){
						throw new Error(actualizarPedidoDetalleResponse.iCode + "||" + actualizarPedidoDetalleResponse.sMessage);
					} 
				}
				if(e.sAccion === "D"){
					var oRegistroPedidoDet = {};
					oRegistroPedidoDet.oAuditRequest   = oRequest.oAuditRequest;
					oRegistroPedidoDet.oData		    = e;  
					const eliminarPedidoDetalleResponse = await  pedidoDetalleTxDao.eliminarPedidoDetalle(oRegistroPedidoDet);
					if(eliminarPedidoDetalleResponse.iCode !== 1){
						throw new Error(eliminarPedidoDetalleResponse.iCode + "||" + eliminarPedidoDetalleResponse.sMessage);
					} 
				}
				
			});
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
 * @creation David Villanueva 22/07/2022
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
			//Eliminamos la cabecera
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarPedidoResponse = await  pedidoTxDao.eliminarPedido(oRegistro);
			if(eliminarPedidoResponse.iCode !== 1){
				throw new Error(eliminarPedidoResponse.iCode + "||" + eliminarPedidoResponse.sMessage);
			} 
			//Eliminamos el detalle
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iPedidoId	  	 = parseInt(e, 10); 
			const eliminarPedidoDetallexPedidoResponse = await  pedidoDetalleTxDao.eliminarPedidoDetallexPedido(oRegistro);
			if(eliminarPedidoDetallexPedidoResponse.iCode !== 1){
				throw new Error(eliminarPedidoDetallexPedidoResponse.iCode + "||" + eliminarPedidoDetallexPedidoResponse.sMessage);
			} 

			//Eliminamos los estados
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iPedidoId	  	 = parseInt(e, 10); 
			const eliminarPedidoEstadoxPedidoResponse = await  pedidoEstadoTxDao.eliminarPedidoEstadoxPedido(oRegistro);
			if(eliminarPedidoEstadoxPedidoResponse.iCode !== 1){
				throw new Error(eliminarPedidoEstadoxPedidoResponse.iCode + "||" + eliminarPedidoEstadoxPedidoResponse.sMessage);
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

