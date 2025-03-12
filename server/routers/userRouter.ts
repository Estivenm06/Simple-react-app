/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import User from '../models/user.ts';
import { newUser } from '../types/userType.ts'

const router: Router = Router()

router.get('/', async (_req: Request, res: Response): Promise<any> => {
    try{
        const users = await User.findAll({})
        return res.json(users)
    }catch(error){
        return res
            .status(500)
            .json({message: 'Internal server error', error})
    }
})

router.get('/:id', async (req: Request, res: Response): Promise<any> => {
    try{
        const id: string = req.params.id
        const userToFind = await User.findByPk(id)
        if(userToFind == null){
            return res
                .status(404)
                .json({message: 'User not found'})
            return;
        }
        return res.json(userToFind)
    }catch(error){
        console.log(error)
        return res
            .status(500)
            .json({message: 'Internal server error', error})
    }
})

router.post('/', async (req: Request, res: Response): Promise<any> => {
    try{
        const userData: newUser = req.body
        const id: number = await User.max('id')
        if(!userData){
            return res
                .status(400)
                .json({message: 'User is empty'})
            return;
        }
        await User.create({id: id + 1, ...userData})
        return res.json(userData)
    }catch(error){
        console.log(error)
        return res
            .status(500)
            .json({message: 'Internal server error', error})
    }
})

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    try{
        const id = req.params.id
        const userToDelete = await User.findByPk(id)
        if(userToDelete == null){
            return res
                .status(404)
                .json({message: 'User not found'})
            return;
        }
        userToDelete.destroy()
        return res.json(userToDelete)
    }catch(error){
        console.log(error)
        return res
            .status(500)
            .json({message: 'Internal server error', error})
    }
})

export default router