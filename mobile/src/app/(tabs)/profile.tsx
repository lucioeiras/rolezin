import { useContext } from 'react'
import { View } from 'react-native'

import UserContext from '../../contexts/user'

export default function ProfileScreen() {
	const user = useContext(UserContext)

	// console.log(user)

	return <View />
}
