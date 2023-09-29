import styled from 'styled-components/native'

export const Container = styled.ScrollView`
	background: #12061f;
`

export const BackButton = styled.TouchableOpacity`
	flex-direction: row;
	gap: 12px;

	position: absolute;
	z-index: 10000;

	background: #12061fba;

	border-radius: 9999px;

	padding: 16px;
	margin: 20px;
`

export const EventImage = styled.Image`
	width: 100%;
	height: 240px;
`

export const Content = styled.View`
	width: 100%;
	padding: 24px;
`

export const EventName = styled.Text`
	color: #fff;
	font-size: 32px;
	font-family: 'Inter_600SemiBold';
`

export const EventDescription = styled.Text`
	color: #cbd5e0;
	font-size: 18px;
	line-height: 27px;

	margin-top: 12px;
`

export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 12px;

	margin-top: 24px;
`

export const OrganizerImage = styled.Image`
	width: 32px;
	height: 32px;
`

export const OrganizerName = styled.Text`
	color: #fff;
	font-size: 18px;
	font-family: 'Inter_500Medium';
`

export const EventInfoText = styled.Text`
	max-width: 400px;

	color: #cbd5e0;
	font-size: 20px;
	font-family: 'Inter_500Medium';
	line-height: 30px;

	margin-top: 12px;
`

export const EventInfoLabel = styled.Text`
	color: #718096;
	font-size: 16px;
	font-family: 'Inter_600SemiBold';
`

export const Button = styled.TouchableOpacity`
	width: 100%;

	align-items: center;
	justify-content: center;

	background: #831fe8;

	border-radius: 5px;

	padding: 16px;
	margin-top: 32px;
`

export const ButtonText = styled.Text`
	color: #fff;
	font-family: 'Inter_700Bold';
	font-size: 16px;
`

export const TicketContainer = styled.View`
	gap: 16px;
`

export const TicketQRCode = styled.Image`
	height: 160px;
	width: 160px;
`
