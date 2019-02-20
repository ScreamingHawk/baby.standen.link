import React, { Component } from 'react'
import styled from 'styled-components'

import ListNames from './ListNames'

const StyledMain = styled.main`
	width: 100%;
	padding: 2em;
	background-color: ${({ theme }) => theme.dark};
	color: ${({ theme }) => theme.light};
	flex: 1;
	flex-grow: 1;
`;

class Main extends Component {
	render() {
		return (
			<StyledMain>
				<h1>Names</h1>
				<ListNames />
			</StyledMain>
		)
	}
}

export default Main
