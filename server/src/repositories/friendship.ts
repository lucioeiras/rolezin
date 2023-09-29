/* eslint-disable @typescript-eslint/no-explicit-any */

import driver from '../config/database'

export default class FriendshipRepository {
  async findUserFriends(userId: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (uf:User)<--(u:User { id: $userId }) RETURN uf`,
      { userId },
    )

    const results = query.records as any

    const users = results.map((result: { _fields: any }) => ({
      ...result._fields[0].properties,
    }))

    db.close()

    return users
  }

  async findNotifications(userId: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (n:Notification)<--(u:User { id: $userId }) RETURN n`,
      { userId },
    )

    const results = query.records as any

    const notifications = results.map((result: { _fields: any }) => ({
      ...result._fields[0].properties,
    }))

    db.close()

    return notifications
  }

  async ask(userIds: string[]) {
    const db = driver.session()

    await db.run(
      `MATCH (u:User { id: $userAskedId }) CREATE (:Notification { userAskingId: $userAskingId, userAskedId: $userAskedId })<-[:RECEIVE]-(u)`,
      { userAskedId: userIds[0], userAskingId: userIds[1] },
    )

    db.close()

    return true
  }

  async confirm(userIds: string[]) {
    const db = driver.session()

    await db.run(
      `MATCH (n:Notification)
      WHERE n.userAskingId = $userAskingId
      AND n.userAskedId = $userAskedId
      DETACH DELETE n`,
      { userAskedId: userIds[0], userAskingId: userIds[1] },
    )

    await db.run(
      `MATCH (u1:User { id: $userId1 }), (u2:User { id: $userId2 }) CREATE (u1)-[:IS_FRIEND]->(u2)`,
      {
        userId1: userIds[0],
        userId2: userIds[1],
      },
    )

    db.close()

    return true
  }

  async delete(userIds: string[]) {
    const db = driver.session()

    await db.run(
      `MATCH (u1:User { id: $userId1 })<-[r:IS_FRIEND]->(:User { id: $userId2 }) DELETE r`,
      {
        userId1: userIds[0],
        userId2: userIds[1],
      },
    )

    db.close()

    return true
  }
}
