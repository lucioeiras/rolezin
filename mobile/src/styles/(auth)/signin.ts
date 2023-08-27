import styled from 'styled-components/native'

export const Container = styled.View`
	height: 100%;
	width: 100%;

	flex-direction: column;
	align-items: center;
	justify-content: center;

	background: #12061f;

	padding: 0px 32px;
`

export const Icon = styled.View`
	background: #12061f;

	border: 2px solid #a465e2;
	border-radius: 9999px;

	padding: 24px 27px;
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

export const Form = styled.View`
	width: 100%;

	gap: 32px;

	margin-top: 32px;
`

export const Field = styled.View`
	width: 100%;
`

export const Label = styled.Text`
	color: #a0aec0;
	font-size: 14px;
	font-family: 'Inter_500Medium';
	letter-spacing: 1.12px;
`

export const Input = styled.TextInput`
	border: 1px solid #2d3748;
	border-radius: 5px;

	color: #e2e8f0;
	font-size: 16px;

	padding: 16px 24px;
	margin-top: 16px;
`

export const Button = styled.TouchableOpacity`
	width: 100%;

	align-items: center;
	justify-content: center;

	background: #831fe8;

	border-radius: 5px;

	padding: 16px;
	margin-top: 8px;
`

export const ButtonText = styled.Text`
	color: #fff;
	font-family: 'Inter_700Bold';
	font-size: 16px;
`

export const Naked = styled.TouchableOpacity`
	width: 100%;

	align-items: center;
	justify-content: center;
`

export const NakedText = styled.Text`
	color: #831fe8;
	font-family: 'Inter_600SemiBold';
	font-size: 16px;
`
