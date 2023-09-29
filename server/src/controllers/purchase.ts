import { Request, Response } from 'express'

import PurchaseRepository from '../repositories/purchase'

class EventController {
  private purchaseRepository: PurchaseRepository

  constructor() {
    this.purchaseRepository = new PurchaseRepository()
  }

  async findUsersByEvent(req: Request, res: Response) {
    const { eventId } = req.params

    const users = await this.purchaseRepository.findUsersByEvent(eventId)

    return res.json(users)
  }

  async findEventsByUser(req: Request, res: Response) {
    const { userId } = req.params

    const events = await this.purchaseRepository.findEventsUserBought(userId)

    return res.json(events)
  }

  async create(req: Request, res: Response) {
    const { userId, eventId } = req.body

    await this.purchaseRepository.save(userId, eventId)

    return res.status(200).send()
  }
}

export default new EventController()
