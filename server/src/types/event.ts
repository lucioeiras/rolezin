export default interface Event {
  id: string
  name: string
  description: string
  date: string
  startHour: string
  endHour: string
  location: string
  image?: string
  organizerId?: string
}
