/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Link } from 'expo-router'

import { CalendarBlank } from 'phosphor-react-native'

import formatDate from '../utils/formatDate'

import {
	Container,
	Event,
	EventImage,
	EventInfo,
	EventName,
	Row,
	EventDate,
	OrganizerImage,
	OrganizerName,
} from '../styles/components/EventList'

import { EventInterface } from '../@types/event'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

interface EventListProps {
	events: EventInterface[]
	showOrganizer: boolean
}

export default function EventList({
	events,
	showOrganizer = true,
}: EventListProps) {
	return (
		<Container horizontal>
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
									<CalendarBlank size={18} color="#718096" weight="regular" />
									<EventDate>{formatDate(event.date)}</EventDate>
								</Row>

								{showOrganizer && (
									<Row>
										{event.organizer.photo && (
											<OrganizerImage
												source={{ uri: BASE_URL + event.organizer.photo }}
											/>
										)}
										<OrganizerName>{event.organizer.name}</OrganizerName>
									</Row>
								)}
							</EventInfo>
						</Event>
					</Link>
				))}
		</Container>
	)
}
