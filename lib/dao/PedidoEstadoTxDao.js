const pedidoEstado   = require('../modelBd/entity/PedidoEstado'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config   = require('../config/config.json');  

/**
 * @description Función que permite crear el estado del pedido
 * @creation David Villanueva 23/08/2022
 * @update
 */
exports.crearPedidoEstado = async function (oParam) { 
    const oResponse = {};
    try {
        var seqPedidoEstado = "'" +config.seqPedidoEstado +"'";
        var seq = await utilsDao.obtenetSequencia(seqPedidoEstado);
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
        oRegistro.CodEstado         = oParam.oData.iCodEstado;
        oRegistro.Estado            = oParam.oData.sEstado; 
        const crearRegistroPromise = await pedidoEstado.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido_estado, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}
