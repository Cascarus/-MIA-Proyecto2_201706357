import { Request, Response} from 'express';

class ImageController {

    public create(req: Request, res:Response) {
        console.log('fotocargada')
        res.json({text:'foto cargada'})
    }

    public get(req: Request, res:Response) {
        console.log('fotocargada')
        res.json({text:'foto cargada'})
    }
}

export const imageController = new ImageController();