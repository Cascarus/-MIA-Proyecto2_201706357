import { Request, Response} from 'express';
import pool from '../database'; 
import * as crypto from 'crypto'; //para incriptar en md5
import nodemailer from 'nodemailer'; //Envia correos, references https://nodemailer.com/about/
import jwt from 'jsonwebtoken';

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
        var sql = 'INSERT INTO usuario (nombre,apellido,pass,email,nacimieno,credito,idTipo_U,confirmacion,token) VALUES (:nombre,:apellido,:pass,:email,:nacimieno,:credito,:idTipo_U,:confirmacion,:token)';
        var obj = req.body;
        obj.token=jwt.sign(obj.email,obj.nombre);
        obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
        console.log(obj);
        connection.exec(sql,obj,function(result:any){
            
            res.json(result);
        });
        
        let transporter = nodemailer.createTransport({
            service: "gmail",
            
            auth: {
              user: '--',
              pass: '--'
            },
            
          });
        
          let info = await transporter.sendMail({
            from: "familyu3213@gmail.com", // sender address
            to: obj.email, // list of receivers
            subject: "Confirmacion De Registro", // Subject line
            text: " Confirme su registro ", // plain text body
            html: "<br><h1>Confirma  tu servicio "+ obj.nombre+".</h1>"+"<br>"+"<h3>Presiona el siguiente link para confirmar tu cuenta</h3>"+"<br>"+ 
            "<a href=\"http://localhost:4200/confirmacionUser/"+obj.token+"\"><buttonhref=\"http://localhost:4200/confirmacionUser/"+obj.token+"\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>"+
            "<br>"+
            "<br><img src=\"https://img.icons8.com/wired/2x/among-us.png\"/>", // html body
          });
    }
    

    public async emailSend(enamil:any){
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "jerrod.satterfield@ethereal.email", // generated ethereal user
              pass: "xxt33ekw4nZr1Y1vYp", // generated ethereal password
            },
          });
        
          let info = await transporter.sendMail({
            from: 'Remitente', // sender address
            to: enamil, // list of receivers
            subject: "Guapa", // Subject line
            text: "Como estas?", // plain text body
            html: "Hermosa", // html body
          });
    }

    public async login(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM usuario WHERE email=:email AND pass=:pass';
        var obj = req.body;
        obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
        console.log(obj.pass);
        connection.exec(sql,obj,function(result:any){
            if (result.length > 0 && result.length < 2 ) {        
                let tempUser={
                    id: result[0].IDUSUARIO,
                    nombre: result[0].NOMBRE,
                    apellido: result[0].APELLIDO,
                    rol: result[0].IDTIPO_U,
                    confirmacion: result[0].CONFIRMACION,
                };
                res.json(tempUser)
            }
        });
    }

    public async confirmacion(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'UPDATE usuario SET confirmacion=1 WHERE token=:ID';
        var id = req.params.id; //Se optiene el parametro que se le envia 
        connection.exec(sql,[id],function(result:any){
            res.json(result);
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