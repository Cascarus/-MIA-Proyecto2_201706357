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
                "<a href=\"http://192.168.0.8:4200/cambioContrasenia/"+obj.token+"\"><buttonhref=\"http://192.168.0.8:4200/cambioContrasenia/"+obj.token+"\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>"+
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

    public async reporte1(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM Bitacora';
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async reporte1Or(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'SELECT * FROM Bitacora ORDER BY fecha :id';
        var id = req.params.id;
        console.log(id);
        if (id=='ASC') {
            sql = 'SELECT * FROM Bitacora ORDER BY fecha ASC';
        }else if (id=='DESC'){
            sql = 'SELECT * FROM Bitacora ORDER BY fecha DESC';
        }
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async addBitacora(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'INSERT INTO Bitacora (email, fecha, descripcion) VALUES (:email,LOCALTIMESTAMP(2), :descripcion)';
        var obj = req.body;
        connection.exec(sql,obj,function(result:any){
            res.json(result);
        });
    }

    public async getReporte2(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'SELECT P.nombre AS Producto, SUM(DT.cantidad) AS cantidad, U.nombre As cliente, U.apellido FROM detalle_factura DT '+
        'INNER JOIN producto P ON (P.idProducto=DT.idProducto) '+
        'INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) group by DT.idProducto, P.nombre, U.idusuario, U.nombre, U.apellido ';
        var obj = req.body;
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getReporte3(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'SELECT P.nombre AS Producto, count(*) AS Me_Gusta, U.nombre As cliente, U.apellido FROM LIKES DT '+
        ' INNER JOIN producto P ON (P.idProducto=DT.idProducto) '+
        ' INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) '+
        ' WHERE DT.estado=1 '+
        ' group by DT.idProducto, P.nombre, U.idusuario, U.nombre, U.apellido';
        var obj = req.body;
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getReporte4(req: Request, res:Response){
        var connection = pool.db2();
        var sql = 'SELECT P.nombre AS Producto, count(*) AS Me_Gusta, U.nombre As cliente, U.apellido FROM LIKES DT '+
        ' INNER JOIN producto P ON (P.idProducto=DT.idProducto) '+
        ' INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) '+
        ' WHERE DT.estado=2 '+
        ' group by DT.idProducto, P.nombre, U.idusuario, U.nombre, U.apellido';
        var obj = req.body;
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getReporte5(req: Request, res:Response){
        var connection = pool.db2();
            var sql = 'SELECT*FROM( '+
                ' SELECT * FROM usuario U WHERE confirmacion=1 AND idTIpo_U=2 '+ 
                ' ORDER BY U.credito DESC '+
                ' )WHERE  ROWNUM <= 10 ';
        var obj = req.body;
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getReporte52(req: Request, res:Response){
        var connection = pool.db2();
            var sql = 'SELECT*FROM( '+
                ' SELECT * FROM usuario U WHERE confirmacion=1 AND idTIpo_U=2 '+
                ' ORDER BY U.credito ASC '+
                ' )WHERE  ROWNUM <= 10 ';
        var obj = req.body;
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getReporte6(req: Request, res:Response){
        var connection = pool.db2();
            var sql = ' SELECT*FROM( '+
                ' SELECT U.nombre,U.email, U.nacimieno, COUNT(*) AS Den FROM denuncias D '+
                ' INNER JOIN Usuario U ON (U.idUsuario=D.idUsuario) '+
                ' GROUP BY  D.idUsuario, U.nombre, U.email, U.nacimieno '+
                ' ORDER BY Den DESC '+
                ' ) WHERE ROWNUM <= 10 ';
        var obj = req.body;
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getReporte7(req: Request, res:Response){
        var connection = pool.db2();
            var sql = ' SELECT*FROM( '+
                ' SELECT U.nombre, U.email, U.credito, COUNT(*) AS Cant FROM producto P '+
                ' INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) '+
                ' WHERE P.estado=0 '+
                ' group by P.idUsuario, U.nombre, U.email, U.credito '+
                ' ORDER BY Cant DESC '+
                ' ) WHERE ROWNUM <= 10 ';
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

    public async getReporte8(req: Request, res:Response){
        var connection = pool.db2();
            var sql = ' SELECT * FROM ( '+
                ' SELECT PA.nombre, TA.suma, TCLI.clientes,  COUNT(*) AS ventas FROM producto P '+
                ' INNER JOIN usuario U ON (U.idUsuario=P.idUsuario) '+
                ' INNER JOIN pais PA ON (PA.idPais=U.idPais) '+
                ' INNER JOIN (SELECT PAA.idPais,SUM(UAA.credito) AS suma FROM pais PAA, usuario UAA WHERE UAA.idPais=PAA.idPais group by PAA.idPais)  TA ON (TA.idPais=PA.idPais) '+
                ' INNER JOIN (SELECT CLI.idPais, count(*) AS clientes FROM usuario CLI group by CLI.idPais ) TCLI ON (TCLI.idPais=PA.idPais) '+
                ' WHERE P.estado=0 '+
                ' GROUP BY U.idPais, PA.nombre, TA.suma, TCLI.clientes '+
                ' ) WHERE ROWNUM <= 10 ';
        connection.exec(sql,[],function(result:any){
            res.json(result);
        });
    }

}

export const apiController = new ApiController();