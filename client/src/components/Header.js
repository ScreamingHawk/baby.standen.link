import React, { Component } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
	width: 100%;
	background-color: ${({ theme }) => theme.header};
	color: ${({ theme }) => theme.main};
	> div {
		padding: 2em;
		flex: 1;
	}
`;

class Header extends Component {
	render() {
		return (
			<StyledHeader>
				<div>
					testing
				</div>
			</StyledHeader>
		)
	}
}

export default Header
