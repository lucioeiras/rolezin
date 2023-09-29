/* eslint-disable @typescript-eslint/no-explicit-any */

import driver from '../config/database'
import User from '../types/user'

export default class UserRepository {
  async listAll() {
    const db = driver.session()

    const query = await db.run(`MATCH (u:User) RETURN u`)
    const results = query.records as any

    const users = results.map(
      (result: { _fields: any }) => result._fields[0].properties,
    )

    db.close()

    return users
  }

  async findUserByID(id: string) {
    const db = driver.session()

    const query = await db.run(`MATCH (u:User { id: $id }) RETURN u`, {
      id,
    })

    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const user = result._fields && result._fields[0].properties

    db.close()

    return user
  }

  async findUserByEmail(email: string) {
    const db = driver.session()

    const query = await db.run(`MATCH (u:User { email: $email }) RETURN u`, {
      email,
    })
    const result = query.records[0] as any

    if (!result) {
      return false
    }

    const user = result._fields && result._fields[0].properties

    db.close()

    return user
  }

  async findByUsername(input: string) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (u:User) WHERE u.username CONTAINS $input RETURN u`,
      { input },
    )
    const results = query.records as any

    const users = results.map(
      (result: { _fields: any }) => result._fields[0].properties,
    )

    db.close()

    return users
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
    document,
  }: User) {
    const db = driver.session()

    const query = await db.run(
      `CREATE (:User {
      id: $id,
      name: $name,
      username: $username,
      email: $email,
      password: $password,
      university: $university,
      provider: $provider,
      photo: $photo,
      document: $document
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
        document,
      },
    )

    const user = query.summary.query.parameters

    db.close()

    return user
  }

  async update({
    id,
    name,
    username,
    email,
    password,
    university,
    document,
  }: User) {
    const db = driver.session()

    const query = await db.run(
      `MATCH (u:User { id: $id })
      SET u.name = $name,
      u.username = $username,
      u.email = $email,
      u.password = $password,
      u.university = $university,
      u.document = $document
    `,
      { id, name, username, email, password, university, document },
    )

    const user = query.summary.query.parameters

    db.close()

    return user
  }

  async delete(id: string) {
    const db = driver.session()

    await db.run(`MATCH (u:User { id: $id }) DETACH DELETE u`, { id })

    db.close()

    return true
  }

  async uploadProfilePhoto(id: string, imageURL: string) {
    const db = driver.session()

    const query = await db.run(
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

    db.close()

    return user
  }
}
