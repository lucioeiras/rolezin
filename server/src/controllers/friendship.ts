import { Request, Response } from 'express'

import FriendshipRepository from '../repositories/friendship'

class FriendshipController {
  private friendshipRepository: FriendshipRepository

  constructor() {
    this.friendshipRepository = new FriendshipRepository()
  }

  async findUserFriends(req: Request, res: Response) {
    const { id } = req.params

    const users = await this.friendshipRepository.findUserFriends(id)

    return res.json(users)
  }

  async findNotifications(req: Request, res: Response) {
    const { id } = req.params

    const notifications = await this.friendshipRepository.findNotifications(id)

    return res.json(notifications)
  }

  async askForFriendship(req: Request, res: Response) {
    const { userIds } = req.body

    await this.friendshipRepository.ask(userIds)

    return res.status(200).send()
  }

  async confirmFriendship(req: Request, res: Response) {
    const { userIds } = req.body

    await this.friendshipRepository.confirm(userIds)

    return res.status(200).send()
  }

  async delete(req: Request, res: Response) {
    const { userIds } = req.body

    await this.friendshipRepository.delete(userIds)

    return res.status(202).send()
  }
}

export default new FriendshipController()
