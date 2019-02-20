import React, { Component } from 'react'
import styled from 'styled-components'

import ListNames from './ListNames'

const StyledMain = styled.main`
	width: 100%;
	padding: 2em;
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	flex: 1;
	flex-grow: 1;
`

const StyledHeading = styled.h1`
	color: ${({ theme }) => theme.accent};
`

class Main extends Component {
	render() {
		return (
			<StyledMain>
				<StyledHeading>Names</StyledHeading>
				<ListNames />
			</StyledMain>
		)
	}
}

export default Main
