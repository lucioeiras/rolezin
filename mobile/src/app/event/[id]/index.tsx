import { useEffect, useState, useContext } from 'react'

import { useRouter, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import {
	ArrowLeft,
	CalendarBlank,
	Clock,
	MapPin,
	Ticket,
} from 'phosphor-react-native'

import {
	Container,
	BackButton,
	EventImage,
	Content,
	EventName,
	EventDescription,
	Row,
	OrganizerImage,
	OrganizerName,
	EventInfoText,
	EventInfoLabel,
	Button,
	ButtonText,
	TicketContainer,
	TicketQRCode,
} from '../../../styles/event'

import api from '../../../config/api'
import { EventInterface } from '../../../@types/event'

import formatDate from '../../../utils/formatDate'
import UserContext, { UserInterface } from '../../../contexts/user'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export default function EventScreen() {
	const router = useRouter()
	const { id } = useLocalSearchParams()

	const user = useContext(UserContext)

	const [event, setEvent] = useState<EventInterface>()
	const [hasBought, setHasBought] = useState(false)

	async function buyEvent() {
		api.post('/purchase', { userId: user.id, eventId: id })
		user.id &&
			router.push({ pathname: '/profile', params: { userId: user.id } })
	}

	useEffect(() => {
		api.get(`/event/${id}`).then(({ data }) => setEvent(data))

		api.get(`/purchase/users/${id}`).then(({ data }) => {
			data.map(
				(eventUser: UserInterface) =>
					eventUser.id === user.id && setHasBought(true),
			)
		})
	}, [])

	return (
		<Container>
			<BackButton onPress={router.back}>
				<ArrowLeft size={20} color="#fff" weight="bold" />
			</BackButton>

			<EventImage source={{ uri: BASE_URL && BASE_URL + event?.image }} />

			<Content>
				<EventName>{event?.name}</EventName>
				<EventDescription>{event?.description}</EventDescription>

				<Row>
					<OrganizerImage
						source={{ uri: BASE_URL && BASE_URL + event?.organizer.photo }}
					/>
					<OrganizerName>{event?.organizer.name}</OrganizerName>
				</Row>

				<Row>
					<CalendarBlank size={18} color="#718096" weight="duotone" />
					<EventInfoLabel>DATA</EventInfoLabel>
				</Row>
				<EventInfoText>{event?.date && formatDate(event.date)}</EventInfoText>

				<Row>
					<Clock size={18} color="#718096" weight="duotone" />
					<EventInfoLabel>HORÁRIO</EventInfoLabel>
				</Row>
				<EventInfoText>
					{event?.startHour} - {event?.endHour}
				</EventInfoText>

				<Row>
					<MapPin size={18} color="#718096" weight="duotone" />
					<EventInfoLabel>LOCALIZAÇÃO</EventInfoLabel>
				</Row>
				<EventInfoText>{event?.location}</EventInfoText>

				{hasBought ? (
					<TicketContainer>
						<Row>
							<Ticket size={18} color="#718096" weight="duotone" />
							<EventInfoLabel>SEU INGRESSO</EventInfoLabel>
						</Row>

						<TicketQRCode
							source={{
								uri: 'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png',
							}}
						/>
					</TicketContainer>
				) : (
					<Button onPress={buyEvent}>
						<ButtonText>Comprar por R${event?.price},00</ButtonText>
					</Button>
				)}
			</Content>

			<StatusBar style="inverted" />
		</Container>
	)
}
