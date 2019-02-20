import React, { Component } from 'react'
import styled from 'styled-components'

const StyledFooter = styled.header`
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
		align-items: flex-end;
	}
`;

class Footer extends Component {
	render() {
		return (
			<StyledFooter>
				<div>
					<span></span>
					<a href="https://michael.standen.link">Daddy</a>
				</div>
			</StyledFooter>
		)
	}
}

export default Footer
