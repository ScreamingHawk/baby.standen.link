import React, { Component } from 'react'
import ThemeWrapper from './components/ThemeWrapper'
import Page from './components/Page'

class App extends Component {
	render() {
		return (
			<ThemeWrapper>
				<Page />
			</ThemeWrapper>
		)
	}
}

export default App
