import { useEffect, useState } from 'react'

import { Link } from 'expo-router'

import { User } from 'phosphor-react-native'

import {
	Container,
	Field,
	Label,
	SearchInput,
	TitleRow,
	Subtitle,
	Results,
	UserContainer,
	UserPicture,
	UserInfo,
	UserName,
	Username,
} from '../../styles/(tabs)/search'

import api from '../../config/api'

import { UserInterface } from '../../contexts/user'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export default function SearchScreen() {
	const [input, setInput] = useState('')
	const [users, setUsers] = useState<UserInterface[]>()

	useEffect(() => {
		if (input.length > 2) {
			api.get(`/search/user/?input=${input}`).then(({ data }) => setUsers(data))
		}
	}, [input])

	return (
		<Container>
			<Field>
				<Label>PESQUISAR</Label>
				<SearchInput
					value={input}
					onChangeText={setInput}
					autoCapitalize="none"
					autoCorrect={false}
					placeholder="Procure um usuário"
					placeholderTextColor="#4A5568"
				/>
			</Field>

			{users && (
				<Results>
					<TitleRow>
						<User size={24} color="#CBD5E0" weight="duotone" />
						<Subtitle>RESULTADOS</Subtitle>
					</TitleRow>

					{users.map((user) => (
						<Link
							href={{
								pathname: '/profile',
								params: { userId: user.id },
							}}
							key={user.id}
						>
							<UserContainer>
								<UserPicture source={{ uri: BASE_URL + user.photo }} />
								<UserInfo>
									<UserName>{user.name}</UserName>
									<Username>@ {user.username}</Username>
								</UserInfo>
							</UserContainer>
						</Link>
					))}
				</Results>
			)}
		</Container>
	)
}
