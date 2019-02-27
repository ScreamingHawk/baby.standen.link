import styled from 'styled-components'

const Input = styled.input`
	color: ${({ theme }) => theme.text};
	background: transparent;
	border: none;
	border-bottom: 1px solid white;
	font-size: 1.5em;
`;

export default Input
