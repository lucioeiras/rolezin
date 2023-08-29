import { useContext, useEffect, useState } from 'react'

import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import {
	PencilSimple,
	SignOut,
	GraduationCap,
	At,
	CalendarBlank,
	Camera,
} from 'phosphor-react-native'

import api from '../../config/api'

import UserContext, { UserInterface } from '../../contexts/user'

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

export default function ProfileScreen() {
	const router = useRouter()
	const userContext = useContext(UserContext)

	const [user, setUser] = useState<UserInterface>()

	async function logout() {
		userContext.remove()
		router.push('/')
	}

	useEffect(() => {
		api.get(`/user/${userContext.id}`).then(({ data }) => setUser({ ...data }))
	}, [])

	return (
		<Container>
			{user && (
				<Header>
					<ProfilePicture source={{ uri: user.photo }} />
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
								<PencilSimple size={18} color="#831FE8" weight="fill" />
								<PrimaryButtonText>Editar perfil</PrimaryButtonText>
							</PrimaryButton>
						</Link>

						<SecondaryButton onPress={logout}>
							<SignOut size={18} color="#718096" weight="regular" />
						</SecondaryButton>
					</ButtonRow>
				</Header>
			)}

			<Session>
				<TitleRow>
					<CalendarBlank size={24} color="#CBD5E0" weight="duotone" />
					<Subtitle>PRÓXIMOS EVENTOS</Subtitle>
				</TitleRow>

				<Tickets>
					<Message>Esse usuário ainda não possui ingressos comprados</Message>
				</Tickets>
			</Session>

			<Session>
				<TitleRow>
					<Camera size={24} color="#CBD5E0" weight="duotone" />
					<Subtitle>ALBUNS</Subtitle>
				</TitleRow>

				<Albums>
					<Message>Esse usuário ainda não criou nenhum album de fotos</Message>
				</Albums>
			</Session>

			<StatusBar style="inverted" />
		</Container>
	)
}
