export interface EventInterface {
	id: string
	name: string
	description: string
	date: string
	startHour: string
	endHour: string
	location: string
	image?: string
	price: number
	organizer: {
		id: string
		name: string
		username: string
		bio: string
		email: string
		password: string
		photo: string
		thumb: string
	}
}
