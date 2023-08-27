import styled from 'styled-components/native'

export const Container = styled.View`
	height: 100%;
	width: 100%;

	flex-direction: column;
	align-items: center;

	background: #12061f;

	padding: 0px 20px;
`

export const Image = styled.Image`
	width: 343px;
	height: 426px;

	border-radius: 0 0 12px 12px;

	margin-top: -56px;
`

export const Icon = styled.View`
	background: #12061f;

	border: 2px solid #a465e2;
	border-radius: 9999px;

	padding: 24px 27px;
	margin-top: -48px;
`

export const Emoji = styled.Text`
	font-size: 40px;
`

export const Title = styled.Text`
	color: #fff;
	font-size: 28px;
	font-weight: 600;
	text-align: center;
	line-height: 42px;

	margin-top: 24px;
`

export const Description = styled.Text`
	color: #a0aec0;
	font-size: 18px;
	text-align: center;
	line-height: 27px;

	margin-top: 8px;
`

export const Subtitle = styled.Text`
	color: #718096;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: 0.96px;

	margin-top: 32px;
`

export const Row = styled.View`
	flex-direction: row;
	gap: 24px;
`

export const Option = styled.TouchableOpacity`
	width: 64px;
	height: 64px;

	align-items: center;
	justify-content: center;

	border: 1px solid #4a5568;
	border-radius: 100%;

	margin-top: 20px;
`
