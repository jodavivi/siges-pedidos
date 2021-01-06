const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

const Pedido = require('./Pedido');   

const PedidoDetalle = db.define('pedido_detalle', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING,
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64),
    PedidoId         :  {
                                type: Sequelize.INTEGER,
                                references: {
                                    model: 'pedido', // 'fathers' refers to table name
                                    key: 'Id', // 'id' refers to column name in fathers table
                                }
                        },
    ProductoId          : Sequelize.INTEGER,
    ProductoCod         : Sequelize.STRING(16),
    ProductoCobBarra    : Sequelize.STRING(32),
    Producto        : Sequelize.STRING(128),
    Cantidad        : Sequelize.FLOAT,
    Precio          : Sequelize.FLOAT,
    SubTotal        : Sequelize.FLOAT,
    Impuesto        : Sequelize.FLOAT, 
    Total           : Sequelize.FLOAT 
} 
,
{
    schema: "ventas",
}); 

PedidoDetalle.belongsTo(Pedido, { as: "Pedido",targetKey: 'Id',foreignKey: 'PedidoId' });   
Pedido.hasMany(PedidoDetalle, { as: "PedidoDetalle",foreignKey: 'PedidoId' }); 

module.exports = PedidoDetalle;