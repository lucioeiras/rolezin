import { Stack } from 'expo-router'

import {
	useFonts,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from '@expo-google-fonts/inter'

export default function TabRoutesLayout() {
	const [fontsLoaded, fontError] = useFonts({
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
	})

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" options={{ title: 'Onboarding' }} />
		</Stack>
	)
}
