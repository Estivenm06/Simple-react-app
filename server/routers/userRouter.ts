import { Router } from 'express';
import { user } from '../models/user.ts';
import { newUser } from '../types/userType.ts'

const router: Router = Router()

router.get('/', async (_req, res) => {
    try{
        const users = await user.classUser.findAll({})
        res.json(users)
    }catch(error){
        res
            .status(500)
            .json({message: 'Internal server error', error})
    }
})

router.get('/:id', async (req, res) => {
    try{
        const id: string = req.params.id
        const userToFind = await user.classUser.findByPk(id)
        if(userToFind == null){
            res
                .status(404)
                .json({message: 'User not found'})
            return;
        }
        res.json(userToFind)
    }catch(error){
        console.log(error)
        res
            .status(500)
            .json({message: 'Internal server error', error})
    }
})

router.post('/', async (req, res) => {
    try{
        const userData: newUser = req.body
        const id: number = await user.classUser.max('id')
        if(!userData){
            res
                .status(400)
                .json({message: 'User is empty'})
            return;
        }
        await user.classUser.create({id: id + 1, ...userData})
        res.json(userData)
    }catch(error){
        console.log(error)
        res
            .status(500)
            .json({message: 'Internal server error', error})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const userToDelete = await user.classUser.findByPk(id)
        if(userToDelete == null){
            res
                .status(404)
                .json({message: 'User not found'})
            return;
        }
        userToDelete.destroy()
        res.json(userToDelete)
    }catch(error){
        console.log(error)
        res
            .status(500)
            .json({message: 'Internal server error', error})
    }
})

export default router