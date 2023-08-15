import { Request, Response } from 'express'

import jsonwebtoken from 'jsonwebtoken'
import { compare } from 'bcrypt'

import UserRepository from '../repositories/user'

const JWT_SECRET = process.env.JWT_SECRET || ''

class AuthController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!(await compare(password, user.password))) {
      return res.status(401).json({ error: 'Password not valid' })
    }

    const token = jsonwebtoken.sign(user, JWT_SECRET, { expiresIn: '7d' })

    return res.json({ user, token })
  }
}

export default new AuthController()
