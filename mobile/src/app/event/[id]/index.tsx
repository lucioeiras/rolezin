import { useEffect, useState } from 'react'

import { useRouter, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { ArrowLeft, CalendarBlank, Clock, MapPin } from 'phosphor-react-native'

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
} from '../../../styles/event'

import api from '../../../config/api'
import { EventInterface } from '../../../@types/event'

import formatDate from '../../../utils/formatDate'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export default function EventScreen() {
	const router = useRouter()
	const { id } = useLocalSearchParams()

	const [event, setEvent] = useState<EventInterface>()

	useEffect(() => {
		api.get(`/event/${id}`).then(({ data }) => setEvent(data))
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
			</Content>

			<StatusBar style="inverted" />
		</Container>
	)
}
