import { createContext } from 'react'

import api from '../config/api'

export interface OrganizerInterface {
  id?: string
  name?: string
  username?: string
  bio?: string
  email?: string
  password?: string
  token?: string
  photo?: string
  thumb?: string
}

interface OrganizerContextInterface {
  data: OrganizerInterface

  store(data: OrganizerInterface): void
  remove(): void

  login(email: string, password: string): Promise<void>
  logout(): void

  register(
    name: string,
    username: string,
    bio: string,
    email: string,
    password: string,
  ): Promise<void>

  update(
    name: string,
    username: string,
    bio: string,
    email: string,
    password: string,
  ): Promise<void>

  updatePhoto(formData: FormData): Promise<void>
  updateThumbnail(formData: FormData): Promise<void>

  delete(): void
}

const UserContext = createContext<OrganizerContextInterface>({
  data: {
    id: localStorage.getItem('id') || '',
    name: localStorage.getItem('name') || '',
    username: localStorage.getItem('username') || '',
    bio: localStorage.getItem('bio') || '',
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
    token: localStorage.getItem('token') || '',
    photo: localStorage.getItem('photo') || '',
    thumb: localStorage.getItem('thumb') || '',
  },

  store(data) {
    data.id && localStorage.setItem('id', data.id)
    data.name && localStorage.setItem('name', data.name)
    data.username && localStorage.setItem('username', data.username)
    data.bio && localStorage.setItem('bio', data.bio)
    data.email && localStorage.setItem('email', data.email)
    data.password && localStorage.setItem('password', data.password)
    data.token && localStorage.setItem('token', data.token)
    data.photo && localStorage.setItem('photo', data.photo)
    data.thumb && localStorage.setItem('thumb', data.thumb)
  },

  remove() {
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('username')
    localStorage.removeItem('bio')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('token')
    localStorage.removeItem('photo')
    localStorage.removeItem('thumb')
  },

  async login(email, password) {
    const { data } = await api.post('/organizer/login', { email, password })
    this.data = data
    this.store(data)
  },

  async logout() {
    this.data = {}
    this.remove()
  },

  async register(name, username, bio, email, password) {
    await api.post('/organizer', { name, username, bio, email, password })
    this.login(email, password)
  },

  async update(name, username, bio, email, password) {
    const { data } = await api.put(`/organizer/${this.data.id}`, {
      name,
      username,
      bio,
      email,
      password,
    })

    this.data = data.user
    this.store(data.user)
  },

  async updatePhoto(formData) {
    const { data } = await api.put(`/organizer/photo/${this.data.id}`, formData)
    this.data.photo = data.url

    data.url && localStorage.setItem('photo', data.url)
  },

  async updateThumbnail(formData) {
    const { data } = await api.put(`/organizer/thumb/${this.data.id}`, formData)
    this.data.thumb = data.url

    data.url && localStorage.setItem('thumb', data.url)
  },

  async delete() {
    await api.delete(`/organizer/${this.data.id}`)
    this.remove()
  },
})

export default UserContext
