/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useState } from 'react'

import { Ticket, ImageSquare } from 'phosphor-react-native'

import EventList from '../../components/EventList'

import {
	Container,
	Events,
	TitleRow,
	Subtitle,
	Albums,
	Message,
} from '../../styles/(tabs)/home'

import api from '../../config/api'

import { EventInterface } from '../../@types/event'

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

				{events && <EventList events={events} showOrganizer={true} />}
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
