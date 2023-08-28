import { Tabs } from 'expo-router'
import { House, MagnifyingGlass, Bell, User } from 'phosphor-react-native'

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						borderTopWidth: 2,
						backgroundColor: '#12061f',
						borderTopColor: '#2D3748',
						paddingVertical: 32,
						height: 48,
					},
					tabBarIcon: ({ size, focused }) => (
						<House
							size={size}
							color={focused ? '#831FE8' : '#4A5568'}
							weight={focused ? 'duotone' : 'regular'}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="search"
				options={{
					title: 'Pesquisar',
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						borderTopWidth: 2,
						backgroundColor: '#12061f',
						borderTopColor: '#2D3748',
						paddingVertical: 32,
						height: 48,
					},
					tabBarIcon: ({ size, focused }) => (
						<MagnifyingGlass
							size={size}
							color={focused ? '#831FE8' : '#4A5568'}
							weight={focused ? 'duotone' : 'regular'}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="notifications"
				options={{
					title: 'Notificações',
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						borderTopWidth: 2,
						backgroundColor: '#12061f',
						borderTopColor: '#2D3748',
						paddingVertical: 32,
						height: 48,
					},
					tabBarIcon: ({ size, focused }) => (
						<Bell
							size={size}
							color={focused ? '#831FE8' : '#4A5568'}
							weight={focused ? 'duotone' : 'regular'}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: 'Perfil',
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						borderTopWidth: 1,
						backgroundColor: '#12061f',
						borderTopColor: '#171923',
						paddingVertical: 32,
						height: 48,
					},
					tabBarIcon: ({ size, focused }) => (
						<User
							size={size}
							color={focused ? '#831FE8' : '#4A5568'}
							weight={focused ? 'duotone' : 'regular'}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
