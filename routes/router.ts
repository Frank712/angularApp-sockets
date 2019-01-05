import { Router, Request, Response } from 'express';

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
    res.json({
        ok: true,
        id,
        body,
        _from
    })
});