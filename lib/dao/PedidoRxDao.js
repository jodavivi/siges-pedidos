const pedido = require('../modelBd/entity/Pedido');  
const pedidoDetalle = require('../modelBd/entity/PedidoDetalle');  

/**
 * @description Función que permite consultar los pedidos
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.consultarPedido = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.sCodigo !== undefined){
            oFiltroLista.where.Codigo  = oFiltro.sCodigo; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        } 
         
        oFiltroLista.where.EstadoId     = 1; 
        oFiltroLista.include = [
            { model: pedidoDetalle, as: "PedidoDetalle" } 
        ]
        const consultarListaResponse = await  pedido.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información del pedido'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: categoria, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}