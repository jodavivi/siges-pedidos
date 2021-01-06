const pedido   = require('../modelBd/entity/Pedido'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config   = require('../config/config.json');  

/**
 * @description Función que permite crear un pedido 
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.crearPedido = async function (oParam) { 
    const oResponse = {};
    try {
        var seqPedido = "'" +config.seqPedido +"'";
        var seq = await utilsDao.obtenetSequencia(seqPedido);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;
        oRegistro.Codigo            = oParam.oData.sCodigo;
        oRegistro.ClienteId         = oParam.oData.iClienteId;
        oRegistro.ClienteNumIdentificacion   = oParam.oData.sClienteNumIdentificacion;
        oRegistro.ClienteNombre     = oParam.oData.sClienteNombre;
        oRegistro.Observacion       = oParam.oData.sObservacion;
        oRegistro.FechaEntrega      = oParam.oData.dFechaEntrega;
        oRegistro.SubTotal          = oParam.oData.fSubTotal;
        oRegistro.Impuesto          = oParam.oData.fImpuesto;
        oRegistro.Total             = oParam.oData.fTotal;
        oRegistro.DireccionEntrega  = oParam.oData.sDireccionEntrega;
        oRegistro.CodigoOperacion   = oParam.oData.sCodigoOperacion;
        oRegistro.PeriodoId         = oParam.oData.iPeriodoId;
        oRegistro.Periodo           = oParam.oData.sPeriodo;
        oRegistro.EstadoPedidoId    = oParam.oData.iEstadoPedidoId;
        oRegistro.EstadoPedido      = oParam.oData.sEstadoPedido;
         
        const crearRegistroPromise = await pedido.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Pedido 
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.actualizarPedido = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.sCodigo !== undefined){
            oRegistro.Codigo     = oParam.oData.sCodigo; 
        }
        if(oParam.oData.iClienteId !== undefined){
            oRegistro.ClienteId     = oParam.oData.iClienteId; 
        }
        if(oParam.oData.sClienteNumIdentificacion !== undefined){
            oRegistro.ClienteNumIdentificacion     = oParam.oData.sClienteNumIdentificacion; 
        }
        if(oParam.oData.sClienteNombre !== undefined){
            oRegistro.ClienteNombre     = oParam.oData.sClienteNombre; 
        }
        if(oParam.oData.sObservacion !== undefined){
            oRegistro.Observacion     = oParam.oData.sObservacion; 
        }
        if(oParam.oData.dFechaEntrega !== undefined){
            oRegistro.FechaEntrega     = oParam.oData.dFechaEntrega; 
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
        if(oParam.oData.sDireccionEntrega !== undefined){
            oRegistro.DireccionEntrega     = oParam.oData.sDireccionEntrega; 
        }
        if(oParam.oData.sCodigoOperacion !== undefined){
            oRegistro.CodigoOperacion     = oParam.oData.sCodigoOperacion; 
        }
        if(oParam.oData.iPeriodoId !== undefined){
            oRegistro.PeriodoId     = oParam.oData.iPeriodoId; 
        }

        if(oParam.oData.sPeriodo !== undefined){
            oRegistro.Periodo     = oParam.oData.sPeriodo; 
        }
        if(oParam.oData.iEstadoPedidoId !== undefined){
            oRegistro.EstadoPedidoId     = oParam.oData.iEstadoPedidoId; 
        }
        if(oParam.oData.sEstadoPedido !== undefined){
            oRegistro.EstadoPedido     = oParam.oData.sEstadoPedido; 
        }
       
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await pedido.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar el pedido 
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.eliminarPedido = async function (oParam) { 
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
        const acrualizarRegistroPromise = await pedido.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}