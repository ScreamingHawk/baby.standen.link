import React, { Component } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
	width: 100%;
	background-color: ${({ theme }) => theme.header};
	color: ${({ theme }) => theme.main};
	text-align: center;
	> h2 {
		margin: 0;
		padding: 2em;
	}
`;

class Header extends Component {
	render() {
		return (
			<StyledHeader>
				<h2>Baby Standen</h2>
			</StyledHeader>
		)
	}
}

export default Header
