/* eslint-disable @typescript-eslint/no-explicit-any */

import driver from '../config/database'
import Event from '../types/event'

export default class EventRepository {
  async listAll() {
    const db = driver.session()

    const query = await db.run(`MATCH (e:Event)<--(o:Organizer) RETURN e, o`)
    const results = query.records as any

    const events = results.map((result: { _fields: any }) => ({
      ...result._fields[0].properties,
      organizer: result._fields[1].properties,
    }))

    db.close()

    return events.filter((event: Event) => {
      const dateObject = new Date()

      const day =
        dateObject.getDate() < 10
          ? '0' + dateObject.getDate()
          : dateObject.getDate()
      const month =
        dateObject.getMonth() < 10
          ? '0' + (dateObject.getMonth() + 1)
          : dateObject.getMonth() + 1
      const year = dateObject.getFullYear()

      const eventDateTimestamp = new Date(event.date)
      const currentDateTimestap = new Date(`${year}-${month}-${day}`)

      if (eventDateTimestamp < currentDateTimestap) {
        return false
      }

      return true
    })
  }

  async findEventByID(id: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (e:Event { id: $id })<--(o:Organizer) RETURN e, o`,
      {
        id,
      },
    )

    const result = query.records[0] as any

    if (!result) return false

    const event = result._fields && {
      ...result._fields[0].properties,
      organizer: result._fields[1].properties,
    }

    db.close()

    return event
  }

  async findEventsByOrganizer(organizerId: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (e:Event)<--(o:Organizer { id: $organizerId }) RETURN e, o`,
      {
        organizerId,
      },
    )

    const results = query.records as any

    const events = results.map((result: { _fields: any }) => ({
      ...result._fields[0].properties,
      organizer: result._fields[1].properties,
    }))

    db.close()

    return events
  }

  async save({
    id,
    organizerId,
    name,
    description,
    date,
    startHour,
    endHour,
    location,
    image,
    price,
  }: Event) {
    const db = driver.session()

    const createQuery = await db.run(
      `CREATE (:Event {
        id: $id,
        name: $name,
        description: $description,
        date: $date,
        startHour: $startHour,
        endHour: $endHour,
        location: $location,
        image: $image,
        price: $price
    })`,
      {
        id,
        name,
        description,
        date,
        startHour,
        endHour,
        location,
        image,
        price,
      },
    )

    const event = createQuery.summary.query.parameters

    await db.run(
      `MATCH (e:Event { id: $eventId }), (o:Organizer { id: $organizerId }) CREATE (o)-[:CREATED]->(e)`,
      { eventId: id, organizerId },
    )

    db.close()

    return event
  }

  async update({
    id,
    name,
    description,
    date,
    startHour,
    endHour,
    location,
    price,
  }: Event) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (e:Event { id: $id })
      SET e.name = $name,
      e.description = $description,
      e.date = $date,
      e.startHour = $startHour,
      e.endHour = $endHour,
      e.location = $location,
      e.price = $price
    `,
      {
        id,
        name,
        description,
        date,
        startHour,
        endHour,
        location,
        price,
      },
    )

    db.close()

    const event = query.summary.query.parameters

    return event
  }

  async delete(id: string) {
    const db = driver.session()

    await db.run(`MATCH (e:Event { id: $id }) DETACH DELETE e`, { id })

    db.close()

    return true
  }

  async uploadImage(id: string, imageURL: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (e:Event { id: $id }) SET e.image = $image`,
      {
        id,
        image: imageURL,
      },
    )

    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const event = result._fields && result._fields[0].properties

    db.close()

    return event
  }
}
