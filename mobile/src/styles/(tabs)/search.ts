import { styled } from 'styled-components/native'

export const Container = styled.ScrollView`
	height: 100%;
	width: 100%;

	flex-direction: column;

	background: #12061f;

	padding: 0 24px;
`

export const Field = styled.View`
	width: 100%;
	margin-top: 24px;
`

export const Label = styled.Text`
	color: #a0aec0;
	font-size: 14px;
	font-family: 'Inter_500Medium';
	letter-spacing: 1.12px;
`

export const SearchInput = styled.TextInput`
	border: 1px solid #2d3748;
	border-radius: 5px;

	color: #e2e8f0;
	font-size: 16px;

	padding: 16px 24px;
	margin-top: 16px;
`

export const TitleRow = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 12px;

	margin: 24px 0;
`

export const Subtitle = styled.Text`
	color: #cbd5e0;
	font-size: 18px;
	font-family: 'Inter_500Medium';
	line-height: 21px;
	letter-spacing: 1.44px;
`

export const Results = styled.View`
	margin-top: 32px;
`

export const UserContainer = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 20px;
`

export const UserPicture = styled.Image`
	width: 48px;
	height: 48px;

	border-radius: 9999px;
`

export const UserInfo = styled.View`
	gap: 8px;
`

export const UserName = styled.Text`
	color: white;
	font-size: 20px;
`

export const Username = styled.Text`
	color: #cbd5e0;
	font-size: 16px;
`

export const Row = styled.View`
	flex-direction: row;
	align-items: center;
	gap: 8px;
`
