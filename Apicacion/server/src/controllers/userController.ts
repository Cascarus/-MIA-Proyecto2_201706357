import { Request, Response} from 'express';
import pool from '../database'; 
import * as crypto from 'crypto'; //para incriptar en md5
import nodemailer from 'nodemailer'; //Envia correos, references https://nodemailer.com/about/
import jwt from 'jsonwebtoken';
import email from  '../email'

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
        var sql = 'SELECT * FROM usuario WHERE email=:email'
        var obj = req.body;
        var bandera:boolean=false;
        obj.token=jwt.sign(obj.email,obj.nombre);
        obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
        
        connection.exec(sql,[obj.email],function(result:any){
            if (result.length < 1 ) {
                sql = 'INSERT INTO usuario (nombre,apellido,pass,email,nacimieno,credito,idTipo_U,confirmacion,token,pathI,idPais) VALUES (:nombre,:apellido,:pass,:email, TO_DATE(:nacimieno, \'YYYY-MM-DD\') ,:credito,:idTipo_U,:confirmacion,:token, :pathI, :idPais)';
                
                connection.exec(sql,obj,function(result:any){
                    res.json({text: 'Creado', token: obj.token});
                    bandera=true;
                });
            }else{
                res.json({text: 'Correo ya existe'});
            }
            
        });
      
    }
    

    public async emailSend(req: Request, res:Response){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            
            auth: email.auth,
            
          });
        
          var obj = req.body;
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
                    idPais: result[0].IDPAIS,
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
        var sql = 'UPDATE usuario SET nombre=:nombre, apellido=:apellido, nacimieno=TO_DATE(:nacimieno, \'YYYY-MM-DD\'), pass=:pass, pathI=:pathI, idPais=:idPais WHERE idUsuario=:id';
        var obj = req.body;
        obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
        var id = req.params.id; //Se optiene el parametro que se le envia 
        console.log(obj);
        connection.exec(sql,obj,function(result:any){
            
            res.json(result);
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
        var sql = 'SELECT * FROM usuario WHERE idUsuario=:id';
        var obj = req.params.id;
        connection.exec(sql,[obj],function(result:any){
            if (result.length > 0 && result.length < 2 ) {        
                let tempUser={
                    id: result[0].IDUSUARIO,
                    nombre: result[0].NOMBRE,
                    apellido: result[0].APELLIDO,
                    rol: result[0].IDTIPO_U,
                    confirmacion: result[0].CONFIRMACION,
                    pathI: result[0].PATHI,
                    email: result[0].EMAIL,
                    credito: result[0].CREDITO,
                    nacimieno: result[0].NACIMIENO,
                    idPais: result[0].IDPAIS,
                };
                res.json(tempUser)
            }
        });
    }

    public async getPaises(req: Request, res: Response){
        var sql = "SELECT * FROM pais";
        
        await pool.db2().exec(sql,[],function(result:any){
           res.json(result);
       });
       
   }

}

export const userController = new UserController();