const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
 
const Pedido = db.define('pedido', { 
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
    CodEmpresa          : Sequelize.STRING(4),
    Empresa             : Sequelize.STRING(64),
    CodSede             : Sequelize.STRING(4),
    Sede                : Sequelize.STRING(64),
    CodApertura         : Sequelize.STRING(8),
    Codigo              : Sequelize.STRING(10),  
    CanalPedido         : Sequelize.STRING(16),
    ClienteNumIdentificacion    : Sequelize.STRING(16),
    ClienteNombre       : Sequelize.STRING(128),
    DireccionEntrega    : Sequelize.STRING(128), 
    DireccionCliente    : Sequelize.STRING(128), 
    DireccionReferencia   : Sequelize.STRING(128),  
    Observacion         : Sequelize.STRING(128),
    CodMesa             : Sequelize.STRING(8),
    CantPersonas        : Sequelize.INTEGER,
    FechaEntrega        : Sequelize.DATE,
    SubTotal            : Sequelize.FLOAT,
    Impuesto            : Sequelize.FLOAT,
    Total               : Sequelize.FLOAT
     
} 
,
{
    schema: "venta",
});

 
module.exports = Pedido;