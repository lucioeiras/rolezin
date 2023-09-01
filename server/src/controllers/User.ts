import { Request, Response } from 'express'

import { v4 as uuid } from 'uuid'
import { hash } from 'bcrypt'

import UserRepository from '../repositories/user'

class UserController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async get(_: Request, res: Response) {
    const users = await this.userRepository.listAll()

    return res.json(users)
  }

  async find(req: Request, res: Response) {
    const { id } = req.params

    const user = await this.userRepository.findUserByID(id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.json(user)
  }

  async create(req: Request, res: Response) {
    const { name, username, email, password, university, provider } = req.body

    const id = uuid()
    const hashedPassword = await hash(password, 10)

    const newUser = await this.userRepository.save({
      id,
      name,
      username,
      email,
      password: hashedPassword,
      university,
      provider,
      photo: `/uploads/standard.png`,
    })

    return res.json(newUser)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const user = await this.userRepository.findUserByID(id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const { name, username, email, password, university } = req.body

    const hashedPassword = await hash(password, 10)

    const updatedUser = await this.userRepository.update({
      id,
      name,
      username,
      email,
      password: hashedPassword,
      university,
    })

    return res.json({ user: updatedUser })
  }

  async updatePicture(req: Request, res: Response) {
    const { id } = req.params

    const user = await this.userRepository.findUserByID(id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (req.file) {
      await this.userRepository.uploadProfilePhoto(
        id,
        `/uploads/${req.file.filename}`,
      )

      return res.json({
        url: `/uploads/${req.file.filename}`,
      })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    await this.userRepository.delete(id)

    return res.status(202).send()
  }
}

export default new UserController()
