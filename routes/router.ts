import { Router, Request, Response } from 'express';
import Server from "../classes/server";

export const router = Router();

router.get("/messages", ( req: Request, res: Response)=>{
    res.json({
        ok: true,
        message: "All ok!"
    })
});

router.post("/messages", ( req: Request, res: Response)=>{
    const body = req.body.body;
    const _from = req.body.from;
    const payload = {
        _from,
        body
    };
    const server = Server.instance;
    server.io.emit( 'new-message', payload );

    res.json({
        ok: true,
        body,
        _from
    })
});

router.post("/messages/:id", ( req: Request, res: Response)=>{
    const body = req.body.body;
    const _from = req.body.from;
    const id = req.params.id;
    const payload = {
        _from,
        body
    };

    const server = Server.instance;
    server.io.in( id ).emit( 'message-private', payload );

    res.json({
        ok: true,
        id,
        body,
        _from
    })
});