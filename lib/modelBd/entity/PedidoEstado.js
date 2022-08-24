const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Pedido = require('./Pedido');   

const PedidoEstado = db.define('pedido_estado', { 
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
    CodEstado   : {
        type: Sequelize.INTEGER,
        comment: '0:Eliminado, 1:Pendiente, 2:Vendido, 2:Despachado'
      },
    Estado      : Sequelize.STRING(32) //0:Eliminado, 1:Pendiente, 2:Vendido, 2:Despachado
     
} 
,
{
    schema: "venta",
});

 
PedidoEstado.belongsTo(Pedido, { as: "Pedido",targetKey: 'Id',foreignKey: 'PedidoId' });   
Pedido.hasMany(PedidoEstado, { as: "PedidoEstado",foreignKey: 'PedidoId' }); 

module.exports = PedidoEstado;