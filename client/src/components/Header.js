import React, { Component } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
	width: 100%;
	padding: 2em;
	background-color: ${({ theme }) => theme.header};
	color: ${({ theme }) => theme.main};
	flex: 1;
`;

class Header extends Component {
	render() {
		return (
			<StyledHeader>
				testing
			</StyledHeader>
		)
	}
}

export default Header
