const pedidoDetalle = require('../modelBd/entity/PedidoDetalle');  

/**
 * @description Función que permite consultar el detalle del pedido
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.consultarPedidoDetalle = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iPedidoId !== undefined){
            oFiltroLista.where.PedidoId  = oFiltro.iPedidoId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1; 
        
        const consultarListaResponse = await  pedidoDetalle.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información del detalle del pedido'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pedido_detalle, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}