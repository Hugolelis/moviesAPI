import { Request, Response } from "express"

// model
import { MovieModel } from "../models/Movie";

// logger
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: any) {
    try {
        const data = req.body
        const movie = await MovieModel.create(data)
        return res.status(201).json(movie)
    } catch(e: any) {
        Logger.error(`Erro no sistema ${e.message}`)
        return res.status(500).json({ error: "Por favor, tente mais tarde." });
    }
}

export async function MovieByID(req: Request, res: any) {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findById(id);
        return res.status(200).json(movie);
    } catch (e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({ error: "O filme não existe." });
    }
}

export async function  getAllMovies(req: Request, res: any) {
    try {
        const movies = await MovieModel.find()
        return res.status(200).json(movies)
    } catch(e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
    }
}

export async function removeMovie(req: Request, res: any) {
    try {
        const id = req.params.id
        const movie = await MovieModel.findById(id)

        await movie?.deleteOne()
        return res.status(200).json({msg: "Filme removido com sucesso."})

    } catch(e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({ error: "O filme não existe." });
    }
}

export async function updateMovie(req: Request, res: any) {
    try {
        const id = req.params.id
        const data = req.body
        const movie = await MovieModel.findById(id)

        await MovieModel.updateMany({_id: id}, data)
        return res.status(200).json(data)

    } catch(e: any) {
        Logger.error(`Erro no sistema: ${e.message}`);
        return res.status(500).json({ error: "O filme não existe." });
    }
}