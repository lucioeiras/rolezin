import { Request, Response } from 'express'

import { v4 as uuid } from 'uuid'
import { hash } from 'bcrypt'

import OrganizerRepository from '../repositories/organizer'

class OrganizerController {
  private organizerRepository: OrganizerRepository

  constructor() {
    this.organizerRepository = new OrganizerRepository()
  }

  async get(_: Request, res: Response) {
    const organizers = await this.organizerRepository.listAll()

    return res.json(organizers)
  }

  async find(req: Request, res: Response) {
    const { id } = req.params

    const organizer = await this.organizerRepository.findOrganizerByID(id)

    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' })
    }

    return res.json(organizer)
  }

  async create(req: Request, res: Response) {
    const { name, username, email, password, bio } = req.body

    const id = uuid()
    const hashedPassword = await hash(password, 10)

    const newUser = await this.organizerRepository.save({
      id,
      name,
      username,
      bio,
      email,
      password: hashedPassword,
      photo: `${process.env.BASE_URL}/uploads/standard-organizer.png`,
      thumb: `${process.env.BASE_URL}/uploads/standard-thumbnail.png`,
    })

    return res.json(newUser)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const organizer = await this.organizerRepository.findOrganizerByID(id)

    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' })
    }

    const { name, username, bio, email, password } = req.body

    const hashedPassword = await hash(password, 10)

    const updatedOrganizer = await this.organizerRepository.update({
      id,
      name,
      username,
      bio,
      email,
      password: hashedPassword,
    })

    return res.json({ user: updatedOrganizer })
  }

  async updatePicture(req: Request, res: Response) {
    const { id } = req.params

    const organizer = await this.organizerRepository.findOrganizerByID(id)

    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' })
    }

    if (req.file) {
      await this.organizerRepository.uploadProfilePhoto(
        id,
        `${process.env.BASE_URL}/uploads/${req.file.filename}`,
      )

      return res.json({
        url: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
      })
    }
  }

  async updateThumbnail(req: Request, res: Response) {
    const { id } = req.params

    const organizer = await this.organizerRepository.findOrganizerByID(id)

    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' })
    }

    if (req.file) {
      await this.organizerRepository.uploadThumbnail(
        id,
        `${process.env.BASE_URL}/uploads/${req.file.filename}`,
      )

      return res.json({
        url: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
      })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    await this.organizerRepository.delete(id)

    return res.status(202).send()
  }
}

export default new OrganizerController()
