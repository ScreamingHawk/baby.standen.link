import React, { Component } from 'react'
import styled from 'styled-components'

import ListNames from './ListNames'

const StyledMain = styled.main`
	width: 100%;
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	flex-grow: 1;
	> div {
		padding: 2em;
		flex: 1;
	}
`

const StyledHeading = styled.h1`
	color: ${({ theme }) => theme.accent};
`

class Main extends Component {
	render() {
		return (
			<StyledMain>
				<div>
					<StyledHeading>Names</StyledHeading>
					<ListNames />
				</div>
			</StyledMain>
		)
	}
}

export default Main
