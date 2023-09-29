import styled from 'styled-components/native'

export const Container = styled.ScrollView`
	height: 100%;
	width: 100%;

	flex-direction: column;

	background: #12061f;

	padding: 0 24px;
`

export const Header = styled.View`
	align-items: center;

	margin-top: 24px;
`

export const ProfilePicture = styled.Image`
	width: 100px;
	height: 100px;

	border-radius: 9999px;
`

export const InfoRow = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 24px;

	margin-top: 16px;
`

export const Name = styled.Text`
	color: #fff;
	font-size: 24px;
	font-family: 'Inter_600SemiBold';

	margin-top: 20px;
`

export const Divisor = styled.View`
	height: 20px;
	width: 1px;

	background-color: #1a202c;
`

export const Username = styled.Text`
	color: #cbd5e0;
	font-size: 18px;
	font-family: 'Inter_500Medium';
`

export const TextRow = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 8px;
`

export const University = styled.Text`
	color: #718096;
	font-size: 16px;
	font-family: 'Inter_500Medium';
`

export const PrimaryButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	gap: 12px;

	border-radius: 8px;

	background-color: #831fe81f;

	padding: 12px 24px;
`

export const ButtonRow = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 16px;

	margin-top: 24px;
`

export const PrimaryButtonText = styled.Text`
	color: #831fe8;
	font-size: 14px;
	font-family: 'Inter_700Bold';
`

export const SecondaryButton = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	gap: 12px;

	border-radius: 8px;
	border: 1px solid #1a202c;

	padding: 12px 12px;
`

export const SecondaryButtonText = styled.Text`
	color: #cbd5e0;
	font-size: 14px;
	font-family: 'Inter_700Bold';
`

export const Session = styled.View`
	margin-top: 48px;
`

export const TitleRow = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 12px;
`

export const Subtitle = styled.Text`
	color: #cbd5e0;
	font-size: 18px;
	font-family: 'Inter_500Medium';
	line-height: 21px;
	letter-spacing: 1.44px;
`

export const Tickets = styled.View`
	margin-top: 16px;
`

export const Albums = styled.View`
	margin-top: 16px;
	margin-bottom: 24px;
`

export const Message = styled.Text`
	color: #718096;
	font-size: 16px;
	font-family: 'Inter_400Regular';
	line-height: 24px;
`
