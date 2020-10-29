import { Request, Response} from 'express';
import pool from '../database';
import nodemailer from 'nodemailer'; //Envia correos, references https://nodemailer.com/about/
import email from  '../email'
import * as crypto from 'crypto'; //para incriptar en md5
class ProductoController {
    //Esta ruta sera para enviar el correo para cambiar la contrania
    public pala:any=[]
   public async addCategoria(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO categoria (nombre) VALUES (:nombre)';
        var obj = req.body;
        connection.exec(sql,obj,function(result:any){
            res.json(result);
        });
    }

    public async getCategoria(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM categoria WHERE idCategoria=:ID';
        var obj = req.params.id;
        connection.exec(sql,[obj],function(result:any){
            let tempUser:any=null;
            if (result.length > 0 && result.length < 2 ) {        
                 tempUser={
                    idCategoria: result[0].IDCATEGORIA,
                    nombre: result[0].NOMBRE
                };
                res.json(tempUser)
            }else{
                res.json(tempUser)
            }
        });
    }

    public async getCategorias(req: Request, res: Response){
        var sql = "SELECT * FROM categoria";
         
         await pool.db2().exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async updateCategoria(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'UPDATE categoria set nombre=:nombre WHERE idCategoria=:idCategoria';
        var obj = req.body;
        connection.exec(sql,obj,function(result:any){
            res.json(result);
        });
    }

    public async addProducto(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO producto (nombre, detalle, precio, estado, pathI, idCategoria, idUsuario, palabras) VALUES (:nombre, :detalle, :precio, :estado, :pathI, :idCategoria, :idUsuario, :palabras)';
        var obj = req.body;
         //recorremos las palabras clave
        connection.exec(sql,obj,function(result:any){
           res.json(result);
           
        });
    }

    public async getProductos(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria) WHERE P.estado=0 AND P.idUsuario!=:ID';
        var id = req.params.id; //Se optiene el parametro que se le envia 
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }

    public async getMyProductos(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM producto WHERE idUsuario=:ID';
        var id = req.params.id; //Se optiene el parametro que se le envia 
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }

    public async getFiltro(req: Request, res: Response){
        var connection = pool.db2();
        var sql = req.body; //obtiene la consulta
        
        connection.exec(sql.sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getProductoDetalis(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT P.idProducto, P.nombre, P.detalle, P.precio, P.estado, P.pathI, P.idCategoria, C.nombre AS nombreCa, P.idUsuario, P.palabras FROM producto P INNER JOIN categoria C ON (C.idCategoria=P.idCategoria)'
                    +'WHERE  P.idProducto=:ID';
        var id = req.params.id; //Se optiene el parametro que se le envia 
        connection.exec(sql,[id],function(result:any){
            let tempP={
                detalle:result[0].DETALLE,
                estado :result[0].ESTADO,
                idCategoria:result[0].IDCATEGORIA,
                idProducto:result[0].IDPRODUCTO,
                idUsuario:result[0].IDUSUARIO,
                nombre:result[0].NOMBRE,
                nombreCA:result[0].NOMBRECA,
                palabras:result[0].PALABRAS,
                pathI:result[0].PATHI,
                precio:result[0].PRECIO,
            }
            res.json(tempP);
        });
    }

    public async addLike(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM Likes WHERE idProducto=:idProducto AND idUsuario=:idUsuario';
        var obj = req.body;
        var obj2 = req.body; //obtiene la consulta
        var estado= obj.estado;
        delete obj.estado;
        connection.exec(sql,obj,function(result:any){
            console.log(result.length);
            if(result.length<1){
                sql= 'INSERT INTO Likes (estado, idProducto, idUsuario) VALUES (:estado,:idProducto,:idUsuario)';
                console.log(obj2);
                connection.exec(sql,[estado,obj2.idProducto, obj2.idUsuario],function(result:any){
                    res.json(result);
                });
            }else if(result.length>0){
                sql='UPDATE Likes SET estado=:estado WHERE idProducto=:idProducto AND idUsuario=:idUsuario';
                connection.exec(sql,[estado,obj2.idProducto, obj2.idUsuario],function(result:any){
                    res.json(result);
                });
            }
        });
    }

    public async getCantLikes(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT count(*) AS Megusta FROM Likes WHERE idProducto=:ID AND estado=1'
        +' UNION ALL '
        +'SELECT count(*) AS Megusta FROM Likes WHERE idProducto=:ID AND estado=2';
        var id = req.params.id;
         //recorremos las palabras clave
        connection.exec(sql,[id],function(result:any){
            
            var tempL={
                Megusta: result[0].MEGUSTA,
                NoMegusta: result[1].MEGUSTA
            }
            res.json(tempL);
        });
    }

    public async addComentario(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO Comentario (coment, idProducto, idUsuario, fecha) VALUES (:coment,:idProducto,:idUsuario, LOCALTIMESTAMP(2) )';
        var obj = req.body;
         //recorremos las palabras clave
        connection.exec(sql,obj,function(result:any){
           res.json(result);
        });
    }

    public async getComentario(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT C.coment, C.idProducto, C.idUsuario, C.fecha, U.nombre, U.apellido FROM comentario C INNER JOIN usuario U ON (U.idUsuario=C.idUsuario) WHERE C.idProducto=:ID';
        var id = req.params.id;
         //recorremos las palabras clave
        connection.exec(sql,[id],function(result:any){
            res.json(result);
        });
    }
    

}

export const productoController = new ProductoController();