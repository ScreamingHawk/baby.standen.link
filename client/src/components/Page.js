import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './Header'
import Main from './Main'
import Footer from './Footer';

const StyledPage = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.text};
`;

const FullHeight = styled.div`
	min-height: 100vh;
`

class Page extends Component {
	render() {
		return (
			<StyledPage>
				<FullHeight>
					<Header />
					<Main />
				</FullHeight>
				<Footer />
			</StyledPage>
		)
	}
}

export default Page
