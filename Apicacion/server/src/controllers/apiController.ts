import { Request, Response} from 'express';
import pool from '../database';
import nodemailer from 'nodemailer'; //Envia correos, references https://nodemailer.com/about/
import email from  '../email'
import * as crypto from 'crypto'; //para incriptar en md5
class ApiController {
    //Esta ruta sera para enviar el correo para cambiar la contrania
   public async recuperrar(req: Request, res: Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM usuario WHERE email=:ID';
        var obj = req.params.id;
        console.log(obj);
        connection.exec(sql,[obj],function(result:any){
            let tempUser:any=null;
            if (result.length > 0 && result.length < 2 ) {        
                 tempUser={
                    nombre: result[0].NOMBRE,
                    apellido: result[0].APELLIDO,
                    email: result[0].EMAIL,
                    token: result[0].TOKEN,
                };
                res.json(tempUser)
            }else{
                res.json(tempUser)
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
                subject: "Cambio de contraseña", // Subject line
                text: " Confirme su cambio de contraseña ", // plain text body
                html: "<br><h1>Confirme que ud "+ obj.nombre+" Quiere cambiar de contraseña.</h1>"+"<br>"+"<h3>Presiona el siguiente link para cambiar la conseña</h3>"+"<br>"+ 
                "<a href=\"http://localhost:4200/cambioContrasenia/"+obj.token+"\"><buttonhref=\"http://localhost:4200/cambioContrasenia/"+obj.token+"\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>"+
                "<br>"+
                "<br><img src=\"https://cdn130.picsart.com/338579709044211.png?type=webp&to=min&r=240\"/>", // html body
              });
    }

    public async cambiarpass(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'UPDATE usuario SET pass=:pass WHERE token=:token';
        var obj = req.body;
        obj.pass = crypto.createHash('md5').update(obj.pass).digest("hex"); //Incriptamos la contraseña
        connection.exec(sql,obj,function(result:any){
            res.json(result);
        });
    }

    

}

export const apiController = new ApiController();