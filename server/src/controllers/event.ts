import { Request, Response } from 'express'

import { v4 as uuid } from 'uuid'

import EventRepository from '../repositories/event'

class EventController {
  private eventRepository: EventRepository

  constructor() {
    this.eventRepository = new EventRepository()
  }

  async get(_: Request, res: Response) {
    const events = await this.eventRepository.listAll()

    return res.json(events)
  }

  async find(req: Request, res: Response) {
    const { id } = req.params

    const event = await this.eventRepository.findEventByID(id)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    return res.json(event)
  }

  async findByOrganizer(req: Request, res: Response) {
    const { organizerId } = req.params

    const events = await this.eventRepository.findEventsByOrganizer(organizerId)

    return res.json(events)
  }

  async create(req: Request, res: Response) {
    const {
      name,
      description,
      date,
      startHour,
      endHour,
      location,
      organizerId,
    } = req.body

    const id = uuid()

    const newEvent = await this.eventRepository.save({
      id,
      organizerId,
      name,
      description,
      date,
      startHour,
      endHour,
      location,
      image: `${process.env.BASE_URL}/uploads/standard-event.png`,
    })

    return res.json(newEvent)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    const event = await this.eventRepository.findEventByID(id)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    const { name, description, date, startHour, endHour, location } = req.body

    const updatedEvent = await this.eventRepository.update({
      id,
      name,
      description,
      date,
      startHour,
      endHour,
      location,
    })

    return res.json({ ...updatedEvent })
  }

  async updatePicture(req: Request, res: Response) {
    const { id } = req.params

    const event = await this.eventRepository.findEventByID(id)

    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }

    if (req.file) {
      await this.eventRepository.uploadImage(
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

    await this.eventRepository.delete(id)

    return res.status(202).send()
  }
}

export default new EventController()
