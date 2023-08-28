/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useContext } from 'react'
import { Platform } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { Link, useRouter } from 'expo-router'

import * as ImagePicker from 'expo-image-picker'
import { ArrowLeft } from 'phosphor-react-native'

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
	BackButton,
	BackButtonText,
	ProfilePicture,
	UploadPicture,
} from '../../styles/(user)/edit'

export default function SignUpScreen() {
	const router = useRouter()

	const user = useContext(UserContext)

	const [name, setName] = useState(user.data.name || '')
	const [username, setUsername] = useState(user.data.username || '')
	const [university, setUniversity] = useState(user.data.university || '')
	const [email, setEmail] = useState(user.data.email || '')
	const [password, setPassword] = useState('')

	const [image, setImage] = useState<ImagePicker.ImagePickerAsset>()

	function createFormData(photo: any) {
		const data = new FormData()

		data.append('image', {
			name: photo.fileName,
			type: photo.type,
			uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
		} as unknown as Blob)

		return data
	}

	async function onSubmit() {
		await user.edit(name, username, university, email, password)
		user.uploadPhoto(createFormData(image))
		setTimeout(() => router.push('/profile'), 500)
	}

	async function deleteAccount() {
		user.delete()
		setTimeout(() => router.push('/'), 500)
	}

	async function pickImage() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
		})

		if (!result.canceled) {
			setImage(result.assets[0])
		}
	}

	return (
		<ScrollContainer>
			<Container>
				<Link href="/profile" asChild>
					<BackButton>
						<ArrowLeft size={20} color="#718096" weight="regular" />
						<BackButtonText>Voltar</BackButtonText>
					</BackButton>
				</Link>

				<Icon>
					<Emoji>✏️</Emoji>
				</Icon>

				<Title>Edite sua conta</Title>
				<Description>Mude as informações sobre você</Description>

				<Form>
					<Field>
						<Label>FOTO</Label>
						<UploadPicture onPress={pickImage}>
							{user.data.photo && (
								<ProfilePicture
									source={{ uri: image ? image.uri : user.data.photo }}
								/>
							)}
						</UploadPicture>
					</Field>

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

					<Button onPress={onSubmit}>
						<ButtonText>Editar conta</ButtonText>
					</Button>

					<Naked onPress={deleteAccount}>
						<NakedText>Deletar conta</NakedText>
					</Naked>
				</Form>
			</Container>

			<StatusBar style="inverted" />
		</ScrollContainer>
	)
}