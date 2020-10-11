import { Request, Response} from 'express';
import pool from '../database';

class ApiController {

   public async consulta1(req: Request, res: Response){
         var sql = "SELECT * FROM Prueba";
         await 
         await pool.db2().exec(sql,[],function(result:any){
            res.json(result);
        });
    }
 /*
    public async consulta2(req: Request, res: Response){
        const ids = await pool.query(` SELECT U.idUsuario AS No_Cliente,U.nombre, SUM(D.cantidad) AS compras FROM detalle AS D 
        INNER JOIN orden AS O ON (O.idOrden = D.idOrden)
        INNER JOIN usuario AS U ON (U.idUsuario = O.idUsuario)
        WHERE U.idTipoUsuario = '1' 
        GROUP BY U.idUsuario
       ORDER BY compras DESC LIMIT 1`);
        res.json(ids)
   }
   public async consulta3(req: Request, res: Response){
    const ids = await pool.query(`(SELECT U.direccion, C.nombre As ciudad, R.nombre AS region, count(*) AS veces FROM orden O
    INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
    INNER JOIN ciudad C ON (C.idCiudad=U.idCiudad)
    INNER JOIN region R ON (R.idRegion = C.idCiudad)
    WHERE U.idTipoUsuario=2
    GROUP BY  U.direccion, U.codigo_postal, U.idCiudad, C.idRegion 
    ORDER BY veces Desc LIMIT 1)
    union
    (SELECT U.direccion, C.nombre As ciudad, R.nombre AS region, count(*) AS veces FROM orden D 
    INNER JOIN orden O ON (O.idOrden = D.idOrden)
    INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
    INNER JOIN ciudad C ON (C.idCiudad=U.idCiudad)
    INNER JOIN region R ON (R.idRegion = C.idCiudad)
    WHERE U.idTipoUsuario=2
    GROUP BY U.direccion, U.idCiudad, C.idRegion,U.codigo_postal
    ORDER BY veces ASC LIMIT 1)`);
    res.json(ids)
}

    public async consulta4(req: Request, res: Response){
    const ids = await pool.query(`SELECT U.idUsuario, U.nombre, SUM(D.cantidad) AS Productos, COUNT(*) AS total FROM detalle D
    INNER JOIN orden O ON (O.idOrden = D.idOrden)
    INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
    INNER JOIN producto P ON (P.idProducto = D.idProducto)
    INNER JOIN categoria_producto CP ON (CP.idCategoria_Producto=P.idCategoria)
    WHERE CP.nombre = 'Cheese' AND  U.idTipoUsuario=1
    GROUP BY idUsuario
    ORDER BY Productos DESC LIMIT 5`);
    res.json(ids)
    }
    public async consulta5(req: Request, res: Response){
        const ids = await pool.query(`(SELECT date_format(U.fecha_registro, '%m') AS mes, U.nombre, SUM(D.cantidad*P.precio_unitario) AS total FROM detalle D
        INNER JOIN orden O ON (O.idOrden=D.idOrden)
        INNER JOIN usuario U ON (U.idUsuario=O.idUsuario)
        INNER JOIN producto P ON (P.idProducto=D.idProducto)
        WHERE U.idTipoUsuario = '1' 
        GROUP BY O.idUsuario 
        ORDER BY total DESC LIMIT 3)
        UNION 
        (SELECT date_format(U.fecha_registro, '%m') AS mes, U.nombre, SUM(D.cantidad*P.precio_unitario) AS total FROM detalle D
        INNER JOIN orden O ON (O.idOrden=D.idOrden)
        INNER JOIN usuario U ON (U.idUsuario=O.idUsuario)
        INNER JOIN producto P ON (P.idProducto=D.idProducto)
        WHERE U.idTipoUsuario = '1' 
        GROUP BY O.idUsuario 
        ORDER BY total ASC LIMIT 3)`);
        res.json(ids)
   }

   public async consulta6(req: Request, res: Response){
       const ids = await pool.query(`(SELECT CP.nombre, SUM(D.cantidad) AS vendidos, SUM(P.precio_unitario*D.cantidad) AS total FROM detalle D
       INNER JOIN orden O ON (O.idOrden = D.idOrden)
       INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
       INNER JOIN producto P ON (P.idProducto = D.idProducto)
       INNER JOIN categoria_producto CP ON (CP.idCategoria_Producto=P.idCategoria)
       WHERE  U.idTipoUsuario=2
       GROUP BY CP.idCategoria_Producto
       ORDER BY vendidos DESC LIMIT 1)
       UNION 
       (SELECT CP.nombre, SUM(D.cantidad) AS vendidos, SUM(P.precio_unitario*D.cantidad) AS total FROM detalle D
       INNER JOIN orden O ON (O.idOrden = D.idOrden)
       INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
       INNER JOIN producto P ON (P.idProducto = D.idProducto)
       INNER JOIN categoria_producto CP ON (CP.idCategoria_Producto=P.idCategoria)
       WHERE  U.idTipoUsuario=2
       GROUP BY CP.idCategoria_Producto
       ORDER BY vendidos ASC LIMIT 1)`);
       res.json(ids)
  }
  public async consulta7(req: Request, res: Response){
   const ids = await pool.query(`(SELECT U.nombre, SUM(D.cantidad) AS pedidos, SUM(P.precio_unitario*D.cantidad) AS total FROM detalle D
   INNER JOIN orden O ON (O.idOrden = D.idOrden)
   INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
   INNER JOIN producto P ON (P.idProducto = D.idProducto)
   INNER JOIN categoria_producto CP ON (CP.idCategoria_Producto=P.idCategoria)
   WHERE CP.nombre = 'Fresh Vegetables' AND  U.idTipoUsuario=2
   GROUP BY U.nombre
   ORDER BY total DESC LIMIT 5)`);
   res.json(ids)
}

   public async consulta8(req: Request, res: Response){
   const ids = await pool.query(`(SELECT U.nombre, U.direccion, R.nombre,C.nombre,U.codigo_postal, SUM(P.precio_unitario*D.cantidad) AS total FROM detalle D
   INNER JOIN orden O ON (O.idOrden = D.idOrden)
   INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
   INNER JOIN producto P ON (P.idProducto = D.idProducto)
   INNER JOIN ciudad C ON (C.idCiudad=U.idCiudad)
   INNER JOIN region R ON (R.idRegion = C.idCiudad)
   WHERE U.idTipoUsuario=1
   GROUP BY O.idUsuario
   ORDER BY total DESC LIMIT 3)
   UNION
   (SELECT U.nombre, U.direccion, R.nombre,C.nombre,U.codigo_postal, SUM(P.precio_unitario*D.cantidad) AS total FROM detalle D
   INNER JOIN orden O ON (O.idOrden = D.idOrden)
   INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
   INNER JOIN producto P ON (P.idProducto = D.idProducto)
   INNER JOIN ciudad C ON (C.idCiudad=U.idCiudad)
   INNER JOIN region R ON (R.idRegion = C.idCiudad)
   WHERE U.idTipoUsuario=1
   GROUP BY O.idUsuario
   ORDER BY total ASC LIMIT 3   )`);
   res.json(ids)
   }
   public async consulta9(req: Request, res: Response){
    const ids = await pool.query(`(SELECT U.nombre, U.telefono, O.idOrden AS 'No_Orden',SUM(D.cantidad) AS Cantidad  FROM detalle D
    INNER JOIN orden O ON (O.idOrden = D.idOrden)
    INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
    INNER JOIN producto P ON (P.idProducto = D.idProducto)
    INNER JOIN categoria_producto CP ON (CP.idCategoria_Producto=P.idCategoria)
    WHERE  U.idTipoUsuario=2
    GROUP BY D.idOrden
    ORDER BY cantidad ASC LIMIT 1)`);
    res.json(ids)
 }
 
    public async consulta10(req: Request, res: Response){
    const ids = await pool.query(`SELECT U.idUsuario, U.nombre, SUM(D.cantidad) AS Productos FROM detalle D
    INNER JOIN orden O ON (O.idOrden = D.idOrden)
    INNER JOIN usuario U ON (U.idUsuario=O.idUsuario) 
    INNER JOIN producto P ON (P.idProducto = D.idProducto)
    INNER JOIN categoria_producto CP ON (CP.idCategoria_Producto=P.idCategoria)
    WHERE CP.nombre = 'Seafood' AND  U.idTipoUsuario=1
    GROUP BY idUsuario
    ORDER BY Productos DESC LIMIT 10`);
    res.json(ids)
    }

    public async eliminarTemporal(req: Request, res: Response){
        const ids = await pool.query(`TRUNCATE TABLE temporal`);
        res.json(ids)
    }

    public async eliminarModelo(req: Request, res: Response){
        
        const notomar = await pool.query(`
        SET FOREIGN_KEY_CHECKS = 0;
        TRUNCATE TABLE detalle;
        TRUNCATE TABLE orden;
        TRUNCATE TABLE compania;
        TRUNCATE TABLE contacto;
        TRUNCATE TABLE usuario;
        TRUNCATE TABLE ciudad ;
        TRUNCATE TABLE region;
        TRUNCATE TABLE producto; 
        TRUNCATE TABLE categoria_producto;
        `);
        res.json(notomar);
    }


    public async cargarTemporal(req: Request, res: Response){
        const ids = await pool.query(`LOAD DATA INFILE '/var/lib/mysql-files/DataCenterData.csv' 
        INTO TABLE temporal
        FIELDS TERMINATED BY ';' 
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS;`);
        res.json(ids)
    }
    
    public async cargarModelo(req: Request, res: Response){
        const Ccontacto = await pool.query(` INSERT INTO contacto (nombre) 
        SELECT DISTINCT contacto_compania FROM temporal;
        
        -- Carga Modelo Compania
        INSERT INTO compania (nombre,correo,telefono,idContacto) 
        SELECT DISTINCT T.nombre_compania,T.correo_compania, T.telefono_compania, 
        (SELECT idContacto FROM contacto AS C WHERE  C.nombre = T.contacto_compania) 
        FROM temporal AS T;
        
        -- Carga Modelo Region
        INSERT INTO region (nombre) 
        SELECT DISTINCT T.region FROM temporal AS T;
        
        -- Carga Modelo Ciudad
        INSERT INTO ciudad (nombre,idRegion)
        SELECT DISTINCT T.ciudad,
        (SELECT R.idRegion FROM region R WHERE R.nombre=T.region) 
        FROM temporal AS T;
        
        --  Usuario
        INSERT INTO usuario (nombre,correo,telefono,fecha_registro,direccion,codigo_postal,idTipoUsuario,idCiudad)
        SELECT DISTINCT T.nombre, T.correo, T.telefono, str_to_date(T.fecha_registro,'%d/%m/%Y'), T.direccion, T.codigo_postal,
        (SELECT idTIpoUsuario FROM tipoUsuario AS TU WHERE TU.identificador=T.tipo ),
        (SELECT C.idCiudad FROM ciudad AS C WHERE C.nombre=T.ciudad)
         FROM temporal AS T;
         
         -- Categoria del producto 
         INSERT INTO categoria_producto (nombre)
         SELECT DISTINCT T.categoria_producto FROM temporal AS T;
         
         -- Carga Productos
         INSERT INTO producto (nombre,precio_unitario,idCategoria)
         SELECT DISTINCT T.producto, T.precio_unitario,
         (SELECT CA.idCategoria_Producto FROM categoria_producto AS CA WHERE CA.nombre=T.categoria_producto)
         FROM temporal AS T;
         
         -- Carga Orden
         INSERT INTO orden (idUsuario,idCompania)
         SELECT DISTINCT 
         (SELECT idUsuario FROM usuario AS U WHERE U.nombre=T.nombre),
         (SELECT idCompania FROM compania AS C WHERE C.nombre=T.nombre_compania)
         FROM temporal AS T;
         
         -- Carga Detalle
         INSERT INTO detalle (idProducto,cantidad,idOrden)
         SELECT (SELECT P.idProducto FROM producto AS P WHERE P.nombre=T.producto AND P.precio_unitario=T.precio_unitario), T.cantidad,
         (SELECT O.idOrden FROM orden AS O INNER JOIN usuario AS U ON (O.idUsuario=U.idUsuario) INNER JOIN compania AS C ON(C.idCompania=O.idCompania) WHERE T.nombre=U.nombre AND C.nombre=T.nombre_compania)
         FROM temporal AS T;`);
        res.json(Ccontacto);        
    } */

}

export const apiController = new ApiController();