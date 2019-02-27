import styled from 'styled-components'

const Button = styled.button`
	color: ${({ theme }) => theme.text};
	background: transparent;
	border: 1px solid ${({ theme }) => theme.accent};
	border-radius: 1em;
	padding: 0.5em;

	&.transparent {
		border: none;
		padding: 0;
	}

	&.large {
		font-size: 1.5em;
	}
`;

export default Button
