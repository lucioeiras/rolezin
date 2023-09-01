/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useState } from 'react'

import { Link } from 'expo-router'

import { Ticket, CalendarBlank, ImageSquare } from 'phosphor-react-native'

import {
	Container,
	Events,
	TitleRow,
	Subtitle,
	EventList,
	EventInfo,
	Event,
	EventImage,
	EventName,
	EventDate,
	Row,
	OrganizerImage,
	OrganizerName,
	Albums,
	Message,
} from '../../styles/(tabs)/home'

import api from '../../config/api'

import { EventInterface } from '../../@types/event'

import formatDate from '../../utils/formatDate'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export default function HomeScreen() {
	const [events, setEvents] = useState<EventInterface[]>()

	useEffect(() => {
		api.get('/event').then(({ data }) => setEvents(data.reverse()))
	}, [])

	return (
		<Container>
			<Events>
				<TitleRow>
					<Ticket size={24} color="#CBD5E0" weight="duotone" />
					<Subtitle>EVENTOS RECOMENDADOS</Subtitle>
				</TitleRow>

				<EventList horizontal>
					{events &&
						events.map((event, index) => (
							<Link
								key={event.id}
								// @ts-ignore
								href={`/event/${event.id}`}
								asChild
							>
								<Event $isFirstChild={index === 0}>
									{event.image && (
										<EventImage source={{ uri: BASE_URL + event.image }} />
									)}
									<EventInfo>
										<EventName>{event.name}</EventName>
										<Row>
											<CalendarBlank
												size={18}
												color="#718096"
												weight="regular"
											/>
											<EventDate>{formatDate(event.date)}</EventDate>
										</Row>

										<Row>
											{event.organizer.photo && (
												<OrganizerImage
													source={{ uri: BASE_URL + event.organizer.photo }}
												/>
											)}
											<OrganizerName>{event.organizer.name}</OrganizerName>
										</Row>
									</EventInfo>
								</Event>
							</Link>
						))}
				</EventList>
			</Events>

			<Albums>
				<TitleRow>
					<ImageSquare size={24} color="#CBD5E0" weight="duotone" />
					<Subtitle>NOVOS ALBUNS</Subtitle>
				</TitleRow>

				<Message>
					Você ainda não possui nenhum amigo. Adicone algum para visualizar suas
					fotos!
				</Message>
			</Albums>
		</Container>
	)
}
