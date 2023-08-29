import { Request, Response } from 'express'

import jsonwebtoken from 'jsonwebtoken'
import { compare } from 'bcrypt'

import UserRepository from '../repositories/user'
import OrganizerRepository from '../repositories/organizer'

const JWT_SECRET = process.env.JWT_SECRET || ''

class AuthController {
  private userRepository: UserRepository
  private organizerRepository: OrganizerRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.organizerRepository = new OrganizerRepository()
  }

  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!(await compare(password, user.password))) {
      return res.status(401).json({ error: 'Password not valid' })
    }

    const token = jsonwebtoken.sign(user, JWT_SECRET, { expiresIn: '7d' })

    return res.json({
      ...user,
      token,
    })
  }

  async organizerLogin(req: Request, res: Response) {
    const { email, password } = req.body

    const organizer = await this.organizerRepository.findOrganizerByEmail(email)

    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' })
    }

    if (!(await compare(password, organizer.password))) {
      return res.status(401).json({ error: 'Password not valid' })
    }

    const token = jsonwebtoken.sign(organizer, JWT_SECRET, { expiresIn: '7d' })

    return res.json({
      ...organizer,
      token,
    })
  }
}

export default new AuthController()
