import { useContext, useState } from 'react'
import { Link, useRouter } from 'expo-router'

import UserContext from '../../contexts/user'

import {
	Container,
	Icon,
	Emoji,
	Title,
	Description,
	Form,
	Field,
	Label,
	Input,
	Button,
	ButtonText,
	Naked,
	NakedText,
} from '../../styles/(auth)/signin'

export default function SignInScreen() {
	const router = useRouter()

	const user = useContext(UserContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function onSubmit() {
		await user.login(email, password)
		router.push('/profile')
	}

	return (
		<Container>
			<Icon>
				<Emoji>👋</Emoji>
			</Icon>

			<Title>Bem-vindo de volta!</Title>
			<Description>
				Entre na sua conta para acessar nosso aplicativo
			</Description>

			<Form>
				<Field>
					<Label>E-MAIL</Label>
					<Input
						value={email}
						onChangeText={setEmail}
						autoCapitalize="none"
						autoComplete="email"
						keyboardType="email-address"
						placeholder="Digite seu melhor e-mail"
						placeholderTextColor="#4A5568"
					/>
				</Field>

				<Field>
					<Label>SENHA</Label>
					<Input
						value={password}
						onChangeText={setPassword}
						autoCapitalize="none"
						secureTextEntry={true}
						placeholder="Digite sua senha mais segura"
						placeholderTextColor="#4A5568"
					/>
				</Field>

				<Button onPress={onSubmit}>
					<ButtonText>Continuar</ButtonText>
				</Button>

				<Link href="/signup" asChild>
					<Naked>
						<NakedText>Não possuo uma conta</NakedText>
					</Naked>
				</Link>
			</Form>
		</Container>
	)
}
