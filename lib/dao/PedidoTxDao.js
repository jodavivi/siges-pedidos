const pedido   = require('../modelBd/entity/Pedido'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config   = require('../config/config.json');  

/**
 * @description Función que permite crear un pedido 
 * @creation David Villanueva 05/01/2022
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
        oRegistro.CodPeriodo         = oParam.oData.sCodPeriodo;
        oRegistro.Periodo           = oParam.oData.sPeriodo;
        oRegistro.CodCliente         = oParam.oData.sCodCliente;
        oRegistro.ClienteNumIdentificacion   = oParam.oData.sClienteNumIdentificacion;
        oRegistro.ClienteNombre     = oParam.oData.sClienteNombre;

        oRegistro.DireccionEntrega        = oParam.oData.sDireccionEntrega;
        oRegistro.DireccionCliente        = oParam.oData.sDireccionCliente;
        oRegistro.DireccionReferencia     = oParam.oData.sDireccionReferencia; 
        oRegistro.Observacion       = oParam.oData.sObservacion;
        
        oRegistro.CanalPedido             = oParam.oData.sCanalPedido; 
        oRegistro.CodUsuarioAtencion      = oParam.oData.sCodUsuarioAtencion; 
        oRegistro.NombreUsuarioAtencion   = oParam.oData.sNombreUsuarioAtencion;

        oRegistro.FechaEntrega      = oParam.oData.dFechaEntrega;
        oRegistro.SubTotal          = oParam.oData.fSubTotal;
        oRegistro.Impuesto          = oParam.oData.fImpuesto;
        oRegistro.Total             = oParam.oData.fTotal;   
        
        oRegistro.CodEstadoPedido    = oParam.oData.sCodEstadoPedido;
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
 * @creation David Villanueva 21/07/2022
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
        if(oParam.oData.sCodPeriodo !== undefined){
            oRegistro.CodPeriodo     = oParam.oData.sCodPeriodo; 
        }
        if(oParam.oData.sPeriodo !== undefined){
            oRegistro.Periodo     = oParam.oData.sPeriodo; 
        }
        if(oParam.oData.sCodCliente !== undefined){
            oRegistro.CodCliente     = oParam.oData.sCodCliente; 
        }
        if(oParam.oData.sClienteNumIdentificacion !== undefined){
            oRegistro.ClienteNumIdentificacion     = oParam.oData.sClienteNumIdentificacion; 
        }
        if(oParam.oData.sClienteNombre !== undefined){
            oRegistro.ClienteNombre     = oParam.oData.sClienteNombre; 
        }
        if(oParam.oData.sDireccionEntrega !== undefined){
            oRegistro.DireccionEntrega     = oParam.oData.sDireccionEntrega; 
        }
        if(oParam.oData.sDireccionCliente !== undefined){
            oRegistro.DireccionCliente     = oParam.oData.sDireccionCliente; 
        }

        if(oParam.oData.sDireccionReferencia !== undefined){
            oRegistro.DireccionReferencia     = oParam.oData.sDireccionReferencia; 
        }
        if(oParam.oData.sDireccionEntrega !== undefined){
            oRegistro.DireccionEntrega     = oParam.oData.sDireccionEntrega; 
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

        if(oParam.oData.sCanalPedido !== undefined){
            oRegistro.CanalPedido     = oParam.oData.sCanalPedido; 
        }

        if(oParam.oData.sCodUsuarioAtencion !== undefined){
            oRegistro.CodUsuarioAtencion     = oParam.oData.sCodUsuarioAtencion; 
        }

        if(oParam.oData.sNombreUsuarioAtencion !== undefined){
            oRegistro.NombreUsuarioAtencion     = oParam.oData.sNombreUsuarioAtencion; 
        }

        if(oParam.oData.sCodEstadoPedido !== undefined){
            oRegistro.CodEstadoPedido     = oParam.oData.sCodEstadoPedido; 
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
 * @creation David Villanueva 21/07/2022
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