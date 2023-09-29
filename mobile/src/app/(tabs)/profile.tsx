import { useContext, useEffect, useState } from 'react'

import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import {
	PencilSimple,
	SignOut,
	GraduationCap,
	At,
	CalendarBlank,
	Camera,
	UserPlus,
} from 'phosphor-react-native'

import api from '../../config/api'

import UserContext, { UserInterface } from '../../contexts/user'

import EventList from '../../components/EventList'

import {
	Container,
	Header,
	ProfilePicture,
	Name,
	Username,
	University,
	PrimaryButton,
	PrimaryButtonText,
	SecondaryButton,
	ButtonRow,
	TextRow,
	InfoRow,
	Divisor,
	Session,
	TitleRow,
	Subtitle,
	Tickets,
	Albums,
	Message,
} from '../../styles/(tabs)/profile'

import { EventInterface } from '../../@types/event'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export default function ProfileScreen() {
	const router = useRouter()
	const { userId } = useLocalSearchParams()
	const userContext = useContext(UserContext)

	const [user, setUser] = useState<UserInterface>()
	const [events, setEvents] = useState<EventInterface[]>()

	async function logout() {
		userContext.remove()
		router.push('/')
	}

	useEffect(() => {
		api.get(`/user/${userId}`).then(({ data }) => setUser({ ...data }))
		api.get(`/purchase/events/${userId}`).then(({ data }) => setEvents(data))
	}, [userId])

	return (
		<Container>
			{user && (
				<Header>
					<ProfilePicture source={{ uri: BASE_URL + user.photo }} />
					<Name>{user.name}</Name>
					<InfoRow>
						<TextRow>
							<At size={18} color="#718096" weight="regular" />
							<Username>{user.username}</Username>
						</TextRow>

						<Divisor />

						<TextRow>
							<GraduationCap size={18} color="#718096" weight="fill" />
							<University>{user.university}</University>
						</TextRow>
					</InfoRow>

					<ButtonRow>
						<Link href="/edit" asChild>
							<PrimaryButton>
								{userId === userContext.id ? (
									<PencilSimple size={18} color="#831FE8" weight="fill" />
								) : (
									<UserPlus size={18} color="#831FE8" weight="fill" />
								)}
								<PrimaryButtonText>
									{userId === userContext.id
										? 'Editar perfil'
										: 'Solicitar amizade'}
								</PrimaryButtonText>
							</PrimaryButton>
						</Link>

						{userId === userContext.id && (
							<SecondaryButton onPress={logout}>
								<SignOut size={18} color="#718096" weight="regular" />
							</SecondaryButton>
						)}
					</ButtonRow>
				</Header>
			)}

			<Session>
				<TitleRow>
					<CalendarBlank size={24} color="#CBD5E0" weight="duotone" />
					<Subtitle>PRÓXIMOS EVENTOS</Subtitle>
				</TitleRow>

				{events && events[0] ? (
					<EventList events={events} showOrganizer={false} />
				) : (
					<Tickets>
						<Message>Você ainda não possui ingressos comprados</Message>
					</Tickets>
				)}
			</Session>

			<Session>
				<TitleRow>
					<Camera size={24} color="#CBD5E0" weight="duotone" />
					<Subtitle>ALBUNS</Subtitle>
				</TitleRow>

				<Albums>
					<Message>Você ainda não criou nenhum album de fotos.</Message>
				</Albums>
			</Session>

			<StatusBar style="inverted" />
		</Container>
	)
}
