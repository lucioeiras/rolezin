/* eslint-disable @typescript-eslint/no-explicit-any */

import driver from '../config/database'

export default class PurchaseRepository {
  async findUsersByEvent(eventId: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (u:User)-->(e:Event { id: $eventId }) RETURN u`,
      { eventId },
    )

    const results = query.records as any

    const users = results.map(
      (result: { _fields: any }) => result._fields[0].properties,
    )

    db.close()

    return users
  }

  async findEventsUserBought(userId: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (o:Organizer)-->(e:Event)<--(u:User { id: $userId }) RETURN e, o`,
      { userId },
    )

    const results = query.records as any

    const events = results.map((result: { _fields: any }) => ({
      ...result._fields[0].properties,
      organizer: result._fields[1].properties,
    }))

    db.close()

    return events
  }

  async save(userId: string, eventId: string) {
    const db = driver.session()

    await db.run(
      `MATCH (e:Event { id: $eventId }),
      (u:User { id: $userId })
      CREATE (u)-[:BOUGHT]->(e)`,
      { eventId, userId },
    )

    db.close()
  }
}
