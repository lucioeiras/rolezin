import { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../config/api'

interface UserInterface {
	id?: string
	name?: string
	username?: string
	university?: string
	email?: string
	password?: string
	photo?: string
	token?: string
}

interface UserContextInterface {
	data: UserInterface

	get(): void
	store(data: UserInterface): void
	login(email: string, password: string): Promise<void>
	logout(): void

	register(
		name: string,
		username: string,
		university: string,
		email: string,
		password: string,
	): Promise<void>

	edit(
		name: string,
		username: string,
		university: string,
		email: string,
		password: string,
	): Promise<void>

	delete(): void

	uploadPhoto(formData: FormData): void
}

const UserContext = createContext<UserContextInterface>({
	data: {},

	async get() {
		const id = (await AsyncStorage.getItem('id')) || ''
		const name = (await AsyncStorage.getItem('name')) || ''
		const username = (await AsyncStorage.getItem('username')) || ''
		const university = (await AsyncStorage.getItem('university')) || ''
		const email = (await AsyncStorage.getItem('email')) || ''
		const password = (await AsyncStorage.getItem('password')) || ''
		const photo = (await AsyncStorage.getItem('photo')) || ''
		const token = (await AsyncStorage.getItem('token')) || ''

		this.data = {
			id,
			name,
			username,
			university,
			email,
			password,
			photo,
			token,
		}
	},

	store(data) {
		data.id && AsyncStorage.setItem('id', data.id)
		data.name && AsyncStorage.setItem('name', data.name)
		data.username && AsyncStorage.setItem('username', data.username)
		data.university && AsyncStorage.setItem('university', data.university)
		data.email && AsyncStorage.setItem('email', data.email)
		data.password && AsyncStorage.setItem('password', data.password)
		data.photo && AsyncStorage.setItem('photo', data.photo)
		data.token && AsyncStorage.setItem('token', data.token)
	},

	async login(email, password) {
		const { data } = await api.post('/login', { email, password })
		this.data = data

		this.store(data)
	},

	async logout() {
		this.data = {}

		await AsyncStorage.removeItem('id')
		await AsyncStorage.removeItem('name')
		await AsyncStorage.removeItem('username')
		await AsyncStorage.removeItem('university')
		await AsyncStorage.removeItem('email')
		await AsyncStorage.removeItem('password')
		await AsyncStorage.removeItem('photo')
		await AsyncStorage.removeItem('token')
	},

	async register(name, username, university, email, password) {
		await api.post('/user', {
			name,
			username,
			university,
			email,
			password,
			provider: 'rolezin',
		})

		this.login(email, password)
	},

	async edit(name, username, university, email, password) {
		const { data } = await api.put(`/user/${this.data.id}`, {
			name,
			username,
			university,
			email,
			password,
			provider: 'rolezin',
		})

		const token = this.data.token

		this.data = { ...data.user, token }
	},

	async delete() {
		await api.delete(`/user/${this.data.id}`)
		this.logout()
	},

	async uploadPhoto(formData) {
		const response = await api.put(`/user/photo/${this.data.id}`, formData)
		this.data.photo = response.data.url
	},
})

export default UserContext
