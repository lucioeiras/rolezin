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
	token?: string
}

interface UserContextInterface {
	data: UserInterface

	get(): void
	store(data: UserInterface): void
	login(email: string, password: string): Promise<void>
	register(
		name: string,
		username: string,
		university: string,
		email: string,
		password: string,
	): Promise<void>
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
		const token = (await AsyncStorage.getItem('token')) || ''

		this.data = { id, name, username, university, email, password, token }
	},

	store(data) {
		data.id && AsyncStorage.setItem('id', data.id)
		data.name && AsyncStorage.setItem('name', data.name)
		data.username && AsyncStorage.setItem('username', data.username)
		data.university && AsyncStorage.setItem('university', data.university)
		data.email && AsyncStorage.setItem('email', data.email)
		data.password && AsyncStorage.setItem('password', data.password)
		data.token && AsyncStorage.setItem('token', data.token)
	},

	async login(email, password) {
		const { data } = await api.post('/login', { email, password })
		this.data = data

		this.store(data)
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
})

export default UserContext
