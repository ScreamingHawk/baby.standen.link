import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './Header'
import Main from './Main'

const StyledPage = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
	flex: 1;
`;

class Page extends Component {
	render() {
		return (
			<StyledPage>
				<Header />
				<Main />
			</StyledPage>
		)
	}
}

export default Page
