import { useContext, useEffect } from 'react'

import { StatusBar } from 'expo-status-bar'
import { Link, useRouter } from 'expo-router'

import FontAwesome from '@expo/vector-icons/FontAwesome'

import UserContext from '../../contexts/user'

import {
	Container,
	Image,
	Icon,
	Emoji,
	Title,
	Description,
	Subtitle,
	Row,
	Option,
} from '../../styles/(auth)/index'

import PartyImage from '../../../assets/party.png'

export default function Onboarding() {
	const router = useRouter()

	const user = useContext(UserContext)

	useEffect(() => {
		user.get()

		setTimeout(() => {
			if (user.data.token) {
				router.push('/profile')
			}
		}, 100)
	}, [user.data])

	return (
		<Container>
			<Image source={PartyImage} />

			<Icon>
				<Emoji>🎉</Emoji>
			</Icon>

			<Title>O único aplicativo de ingressos que você precisa</Title>
			<Description>
				Aproveite a melhor experiência ao comprar ou organizar suas festas
			</Description>

			<Subtitle>ENTRAR COM</Subtitle>

			<Row>
				<Option>
					<FontAwesome name="apple" size={24} color="#CBD5E0" />
				</Option>

				<Option>
					<FontAwesome name="google" size={24} color="#CBD5E0" />
				</Option>

				<Option>
					<FontAwesome name="facebook" size={24} color="#CBD5E0" />
				</Option>

				<Link href="/signin" asChild>
					<Option>
						<FontAwesome name="envelope" size={24} color="#CBD5E0" />
					</Option>
				</Link>
			</Row>

			<StatusBar style="inverted" />
		</Container>
	)
}
