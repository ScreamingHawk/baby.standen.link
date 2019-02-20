import React, { Component } from 'react'
import styled from 'styled-components'

import Info from './Info'

const StyledHeader = styled.header`
	width: 100%;
	background-color: ${({ theme }) => theme.header};
	color: ${({ theme }) => theme.main};
	text-align: center;
	font-size: 1.2em;
	padding: 2em;
	box-sizing: border-box;
	> h2 {
		margin: 0;
	}
`;

class Header extends Component {
	render() {
		return (
			<StyledHeader>
				<h2>Baby Standen</h2>
				<Info />
			</StyledHeader>
		)
	}
}

export default Header
