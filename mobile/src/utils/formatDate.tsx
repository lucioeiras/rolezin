export default function formatDate(date: string) {
	const splitedDate = date.split('-')
	return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
}
