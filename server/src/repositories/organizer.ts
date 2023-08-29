/* eslint-disable @typescript-eslint/no-explicit-any */

import driver from '../config/database'
import Organizer from '../types/organizer'

export default class OrganizerRepository {
  async listAll() {
    const db = driver.session()

    const query = await db.run(`MATCH (o:Organizer) RETURN o`)
    const results = query.records as any

    const users = results.map(
      (result: { _fields: any }) => result._fields[0].properties,
    )

    db.close()

    return users
  }

  async findOrganizerByID(id: string) {
    const db = driver.session()

    const query = await db.run(`MATCH (o:Organizer { id: $id }) RETURN o`, {
      id,
    })

    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const organizer = result._fields && result._fields[0].properties

    db.close()

    return organizer
  }

  async findOrganizerByEmail(email: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (o:Organizer { email: $email }) RETURN o`,
      {
        email,
      },
    )
    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const organizer = result._fields && result._fields[0].properties

    db.close()

    return organizer
  }

  async save({
    id,
    name,
    username,
    bio,
    email,
    password,
    thumb,
    photo,
  }: Organizer) {
    const db = driver.session()

    const query = await db.run(
      `CREATE (:Organizer {
      id: $id,
      name: $name,
      username: $username,
      bio: $bio,
      email: $email,
      password: $password,
      photo: $photo,
      thumb: $thumb
    })`,
      {
        id,
        name,
        username,
        bio,
        email,
        password,
        photo,
        thumb,
      },
    )

    const organizer = query.summary.query.parameters

    db.close()

    return organizer
  }

  async update({ id, name, username, bio, email, password }: Organizer) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (o:Organizer { id: $id })
      SET o.name = $name,
      o.username = $username,
      o.bio = $bio,
      o.email = $email,
      o.password = $password
    `,
      { id, name, username, bio, email, password },
    )

    const organizer = query.summary.query.parameters

    db.close()

    return organizer
  }

  async delete(id: string) {
    const db = driver.session()

    await db.run(`MATCH (o:Organizer { id: $id }) DETACH DELETE o`, { id })

    db.close()

    return true
  }

  async uploadProfilePhoto(id: string, imageURL: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (o:Organizer { id: $id }) SET o.photo = $photo`,
      {
        id,
        photo: imageURL,
      },
    )

    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const organizer = result._fields && result._fields[0].properties

    db.close()

    return organizer
  }

  async uploadThumbnail(id: string, imageURL: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (o:Organizer { id: $id }) SET o.thumb = $thumb`,
      {
        id,
        thumb: imageURL,
      },
    )

    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const organizer = result._fields && result._fields[0].properties

    db.close()

    return organizer
  }
}
