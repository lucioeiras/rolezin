/* eslint-disable @typescript-eslint/no-explicit-any */

import { Session } from 'neo4j-driver'

import driver from '../config/database'
import User from '../types/user'

export default class UserRepository {
  private db: Session

  constructor() {
    this.db = driver.session()
  }

  async listAll() {
    const query = await this.db.run(`MATCH (u:User) RETURN u`)
    const results = query.records as any

    const users = results.map(
      (result: { _fields: any }) => result._fields[0].properties,
    )

    return users
  }

  async findUserByID(id: string) {
    const query = await this.db.run(`MATCH (u:User { id: $id }) RETURN u`, {
      id,
    })

    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const user = result._fields && result._fields[0].properties

    return user
  }

  async findUserByEmail(email: string) {
    const query = await this.db.run(
      `MATCH (u:User { email: $email }) RETURN u`,
      {
        email,
      },
    )
    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const user = result._fields && result._fields[0].properties

    return user
  }

  async save({
    id,
    name,
    username,
    email,
    password,
    university,
    provider,
    photo,
  }: User) {
    const query = await this.db.run(
      `CREATE (:User {
      id: $id,
      name: $name,
      username: $username,
      email: $email,
      password: $password,
      university: $university,
      provider: $provider,
      photo: $photo
    })`,
      {
        id,
        name,
        username,
        email,
        password,
        university,
        provider,
        photo,
      },
    )

    const user = query.summary.query.parameters

    return user
  }

  async update({ id, name, username, email, password, university }: User) {
    const query = await this.db.run(
      `MATCH (u:User { id: $id })
      SET u.name = $name,
      u.username = $username,
      u.email = $email,
      u.password = $password,
      u.university = $university
    `,
      { id, name, username, email, password, university },
    )

    const user = query.summary.query.parameters

    return user
  }

  async delete(id: string) {
    await this.db.run(`MATCH (u:User { id: $id }) DETACH DELETE u`, { id })

    return true
  }

  async uploadProfilePhoto(id: string, imageURL: string) {
    const query = await this.db.run(
      `MATCH (u:User { id: $id }) SET u.photo = $photo`,
      {
        id,
        photo: imageURL,
      },
    )

    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const user = result._fields && result._fields[0].properties

    return user
  }
}
