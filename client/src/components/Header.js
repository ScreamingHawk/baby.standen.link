import React, { Component } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
	width: 100%;
	background-color: ${({ theme }) => theme.header};
	color: ${({ theme }) => theme.main};
	a {
		color: ${({ theme }) => theme.accent};
		font-size: 0.8em;
	}
	> div {
		padding: 2em;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

class Header extends Component {
	render() {
		return (
			<StyledHeader>
				<div>
					<span></span>
					<h2>Baby Standen</h2>
					<a href="https://michael.standen.link">Michael</a>
				</div>
			</StyledHeader>
		)
	}
}

export default Header
