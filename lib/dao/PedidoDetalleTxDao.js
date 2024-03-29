const pedidoDetalle   = require('../modelBd/entity/PedidoDetalle'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config   = require('../config/config.json');  

/**
 * @description Función que permite crear el detalle del pedido
 * @creation David Villanueva 21/07/2022
 * @update
 */
exports.crearPedidoDetalle = async function (oParam) { 
    const oResponse = {};
    try {
        var seqPedidoDetalle = "'" +config.seqPedidoDetalle +"'";
        var seq = await utilsDao.obtenetSequencia(seqPedidoDetalle);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;
        
        oRegistro.PedidoId          = oParam.oData.iPedidoId;
        oRegistro.CodProducto        = oParam.oData.sCodProducto;
        oRegistro.Producto       = oParam.oData.sProducto;
        oRegistro.ProductoPresentacion  = oParam.oData.sProductoPresentacion; 
        oRegistro.Cantidad          = oParam.oData.fCantidad;
        oRegistro.UnidadMedida          = oParam.oData.sUnidadMedida;
        oRegistro.Precio            = oParam.oData.fPrecio;
        oRegistro.Descuento          = oParam.oData.fDescuento;
        oRegistro.Total             = oParam.oData.fTotal;  
        const crearRegistroPromise = await pedidoDetalle.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido_detalle, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Pedido_Detalle 
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.actualizarPedidoDetalle = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
         
        if(oParam.oData.sCodProducto !== undefined){
            oRegistro.CodProducto     = oParam.oData.sCodProducto; 
        }
        if(oParam.oData.sProducto !== undefined){
            oRegistro.Producto     = oParam.oData.sProducto; 
        }
        if(oParam.oData.sProductoPresentacion !== undefined){
            oRegistro.ProductoPresentacion     = oParam.oData.sProductoPresentacion; 
        }
        if(oParam.oData.sProductoCobBarra !== undefined){
            oRegistro.ProductoCobBarra     = oParam.oData.sProductoCobBarra; 
        }
        if(oParam.oData.fCantidad !== undefined){
            oRegistro.Cantidad     = oParam.oData.fCantidad; 
        }
        if(oParam.oData.fPrecio !== undefined){
            oRegistro.Precio     = oParam.oData.fPrecio; 
        }
        if(oParam.oData.fSubTotal !== undefined){
            oRegistro.SubTotal     = oParam.oData.fSubTotal; 
        }
 
        if(oParam.oData.fImpuesto !== undefined){
            oRegistro.Impuesto     = oParam.oData.fImpuesto; 
        }
        if(oParam.oData.fTotal !== undefined){
            oRegistro.Total     = oParam.oData.fTotal; 
        }
    
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await pedidoDetalle.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido_detalle, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar el detalle del pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.eliminarPedidoDetalle = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await pedidoDetalle.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido_detalle, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar el detalle x id de pedido
 * @creation David Villanueva 29/12/2022
 * @update
 */
exports.eliminarPedidoDetallexPedido = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.PedidoId = oParam.oData.iPedidoId;
        oFiltro.where.EstadoId = 1;
        const acrualizarRegistroPromise = await pedidoDetalle.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido_detalle, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}