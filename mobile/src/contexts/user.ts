import { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface UserInterface {
	password: string
	provider: string
	university: string
	name: string
	photo: string
	id: string
	email: string
	username: string
}

interface UserContextInterface {
	id?: string
	token?: string

	get(): void
	store(id: string, token: string): void
	remove(): void
}

const UserContext = createContext<UserContextInterface>({
	async get() {
		this.id = (await AsyncStorage.getItem('id')) || ''
		this.token = (await AsyncStorage.getItem('token')) || ''
	},

	async store(id, token) {
		this.id = id
		this.token = token

		id && (await AsyncStorage.setItem('id', id))
		token && (await AsyncStorage.setItem('token', token))
	},

	async remove() {
		delete this.id
		delete this.token

		await AsyncStorage.removeItem('id')
		await AsyncStorage.removeItem('token')
	},
})

export default UserContext
