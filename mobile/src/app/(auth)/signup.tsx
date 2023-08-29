import { useState, useContext } from 'react'
import { Link, useRouter } from 'expo-router'

import UserContext from '../../contexts/user'

import {
	ScrollContainer,
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
} from '../../styles/(auth)/signup'

import api from '../../config/api'

export default function SignUpScreen() {
	const router = useRouter()

	const userContext = useContext(UserContext)

	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [university, setUniversity] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	async function onSubmit() {
		if (confirmPassword === password) {
			await api.post('/user', {
				name,
				username,
				university,
				email,
				password,
				provider: 'rolezin',
			})

			const { data } = await api.post('/user/login', { email, password })
			userContext.store(data.id, data.token)

			setTimeout(() => router.push('/profile'), 500)
		}
	}

	return (
		<ScrollContainer>
			<Container>
				<Icon>
					<Emoji>😎</Emoji>
				</Icon>

				<Title>Crie sua conta</Title>
				<Description>
					Mude a forma como você vê as festas universitárias
				</Description>

				<Form>
					<Field>
						<Label>NOME</Label>
						<Input
							value={name}
							onChangeText={setName}
							placeholder="Digite seu nome completo"
							placeholderTextColor="#4A5568"
						/>
					</Field>

					<Field>
						<Label>USUÁRIO</Label>
						<Input
							value={username}
							onChangeText={setUsername}
							autoCorrect={false}
							autoCapitalize="none"
							placeholder="Digite um nome bem marcante"
							placeholderTextColor="#4A5568"
						/>
					</Field>

					<Field>
						<Label>FACULDADE</Label>
						<Input
							value={university}
							onChangeText={setUniversity}
							placeholder="Digite em qual faculdade você estuda"
							placeholderTextColor="#4A5568"
						/>
					</Field>

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

					<Field>
						<Label>CONFIRMAR SENHA</Label>
						<Input
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							autoCapitalize="none"
							secureTextEntry={true}
							placeholder="Digite sua senha novamente"
							placeholderTextColor="#4A5568"
						/>
					</Field>

					<Button onPress={onSubmit}>
						<ButtonText>Criar conta</ButtonText>
					</Button>

					<Link href="/signin" asChild>
						<Naked>
							<NakedText>Já possuo uma conta</NakedText>
						</Naked>
					</Link>
				</Form>
			</Container>
		</ScrollContainer>
	)
}
