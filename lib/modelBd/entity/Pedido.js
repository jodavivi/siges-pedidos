const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

db.createSchema("ventas").then(() => {
    // esquema para el producto
});

const Categoria = db.define('pedido', { 
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
    Codigo              : Sequelize.STRING(16),
    ClienteId           : Sequelize.INTEGER,
    ClienteNumIdentificacion    : Sequelize.STRING(64),
    ClienteNombre       : Sequelize.INTEGER,
    Observacion         : Sequelize.STRING(128),
    FechaEntrega        : Sequelize.DATE,
    SubTotal            : Sequelize.FLOAT,
    Impuesto            : Sequelize.FLOAT,
    Total               : Sequelize.FLOAT,
    DireccionEntrega    : Sequelize.STRING(128),
    CodigoOperacion     : Sequelize.STRING(16),
    PeriodoId           : Sequelize.INTEGER, 
    Periodo             : Sequelize.STRING(16),
    EstadoPedidoId      : Sequelize.INTEGER,
    EstadoPedido        : Sequelize.STRING(64)
} 
,
{
    schema: "ventas",
});

 
module.exports = Categoria;