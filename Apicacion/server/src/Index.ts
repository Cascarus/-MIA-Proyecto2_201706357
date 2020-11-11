import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import apiRputes from './routes/apiRputes';
import userRoutes from './routes/userRoutes';
import imageRoutes from './routes/imageRoutes';
import productoRoutes from './routes/productoRoutes';
import path from 'path';
import * as socketIo from 'socket.io';
import { createServer, Server } from 'http';
class Server1 {
    
    //-----------------------
     
    //----------------

    public app: Application;
    public server : Server;
    public io : SocketIO.Server;
    constructor(){
        this.app = express();
        
        this.config();
        this.server = createServer(this.app);
        this.io = socketIo.default(this.server);
        this.routes();
        
       
        
    }

    config(): void{
        this.app.set('port',3009);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));

    }

    routes():void {
        this.app.use('/', indexRoutes);
        this.app.use('/api', apiRputes);
        this.app.use('/user', userRoutes);
        this.app.use('/image', imageRoutes);
        this.app.use('/uploads', express.static(path.resolve('uploads')));
        this.app.use('/producto', productoRoutes);
    }

    start():void{
        var mensaje:string="asd";

        this.io.on('connection', (socket:Server) => {           
            console.log('mas de algo envia');
      });

        this.server.listen(this.app.get('port'),() => {
            console.log('Server on port ',this.app.get('port'));
        });


       /* this.io.on('connect', (socket:any) => {
            socket.on('send-message', function(data:any){
                socket.emit('text-event',mensaje );
                socket.broadcast.emit('text-event', mensaje);
            });

            
        });*/
        
        
    }
}

export const server = new Server1();
server.start();