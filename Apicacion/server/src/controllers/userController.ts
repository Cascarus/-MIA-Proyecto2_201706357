import { Request, Response} from 'express';
import pool from '../database';
import * as crypto from 'crypto';
class UserController {
   mensaje:string="Si sale archivos";

   public async getUser(req: Request, res: Response){
         var sql = "SELECT * FROM usuario";
         
         await pool.db2().exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async create(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO usuario (nombre,apellido,pass,email,nacimieno,credito,idTipo_U) VALUES (:nombre,:apellido,:pass,:email,:nacimieno,:credito,:idTipo_U)';
        var obj = req.body;
        obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
        console.log(obj);
        connection.exec(sql,obj,function(result:any){
            res.json(result);
        });
    }
    
    public async login(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM usuario WHERE email=:email AND pass=:pass';
        var obj = req.body;
        obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
        connection.exec(sql,obj,function(result:any){
            if (result.length > 0 && result.length < 2) {        
                let tempUser={
                    id: result[0].IDUSUARIO,
                    nombre: result[0].NOMBRE,
                    apellido: result[0].APELLIDO,
                    rol: result[0].IDTIPO_U,
                };
                res.json(tempUser)
            }
        });
    }

    public async update(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'BEGIN insertuser(:reg,:nameU,:img,:mail,:pass,:cel); END;';
        var obj = req.body;
        console.log(obj);
        connection.exec(sql,[obj.reg,obj.name,obj.img,obj.mail,obj.pass,obj.phone],function(result:any){
            if(result==undefined){
                sql = 'INSERT INTO ROL_USUARIO VALUES(:1,:2,:3,:4,:5)';
                connection = pool.db2();
                connection.execMany(sql,obj.rolTab);
                res.send({status:'success'});
            }
            else
                res.send({status:'error'});
        });
    }

    public async delete(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'BEGIN insertuser(:reg,:nameU,:img,:mail,:pass,:cel); END;';
        var obj = req.body;
        console.log(obj);
        connection.exec(sql,[obj.reg,obj.name,obj.img,obj.mail,obj.pass,obj.phone],function(result:any){
            if(result==undefined){
                sql = 'INSERT INTO ROL_USUARIO VALUES(:1,:2,:3,:4,:5)';
                connection = pool.db2();
                connection.execMany(sql,obj.rolTab);
                res.send({status:'success'});
            }
            else
                res.send({status:'error'});
        });
    }

    public async getOneUser(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'BEGIN insertuser(:reg,:nameU,:img,:mail,:pass,:cel); END;';
        var obj = req.body;
        console.log(obj);
        connection.exec(sql,[obj.reg,obj.name,obj.img,obj.mail,obj.pass,obj.phone],function(result:any){
            if(result==undefined){
                sql = 'INSERT INTO ROL_USUARIO VALUES(:1,:2,:3,:4,:5)';
                connection = pool.db2();
                connection.execMany(sql,obj.rolTab);
                res.send({status:'success'});
            }
            else
                res.send({status:'error'});
        });
    }

    

}

export const userController = new UserController();