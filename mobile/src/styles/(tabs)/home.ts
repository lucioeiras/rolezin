import styled from 'styled-components/native'

export const Container = styled.View`
	height: 100%;
	width: 100%;

	flex-direction: column;

	background: #12061f;

	padding: 32px 24px;
`

export const Events = styled.View``

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

export const EventList = styled.ScrollView`
	margin-top: 16px;
`

export const Event = styled.TouchableOpacity<{ $isFirstChild?: boolean }>`
	width: 240px;

	border: 1px solid #1a202c;
	border-radius: 8px;

	${({ $isFirstChild }) => !$isFirstChild && 'margin-left: 16px;'}
`

export const EventImage = styled.Image`
	width: 100%;
	height: 120px;

	border-radius: 7px 7px 0 0;
`

export const EventInfo = styled.View`
	padding: 20px;
`

export const EventName = styled.Text`
	color: #fff;
	font-size: 20px;
	font-family: 'Inter_600SemiBold';
`

export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 8px;

	margin-top: 12px;
`

export const EventDate = styled.Text`
	color: #a0aec0;
	font-size: 16px;
	font-family: 'Inter_400Regular';
`

export const OrganizerImage = styled.Image`
	width: 28px;
	height: 28px;

	border-radius: 9999px;
`

export const OrganizerName = styled.Text`
	color: #e2e8f0;
	font-size: 16px;
	font-family: 'Inter_500Medium';

	margin-left: 4px;
`

export const Albums = styled.View`
	margin-top: 48px;
`

export const Message = styled.Text`
	color: #718096;
	font-size: 16px;
	font-family: 'Inter_400Regular';
	line-height: 24px;

	margin-top: 16px;
`
