const pedidoRxDao 	 = require('../dao/PedidoRxDao'); 

const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar pedido
 * @creation David Villanueva 22/07/2022
 * @update
 */
exports.consultarPedido = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroCategoria = {};
		 oFiltroCategoria.sCodigo  = req.query.sCodigo;
		 oFiltroCategoria.iId 	  = req.query.iId; 
		 var consultarPedidoResponse =  await pedidoRxDao.consultarPedido(oFiltroCategoria);
		 if(consultarPedidoResponse.iCode !== 1){
			throw new Error(consultarPedidoResponse.iCode + "||" + consultarPedidoResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarPedidoResponse.oData;
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
 