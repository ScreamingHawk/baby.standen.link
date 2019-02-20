import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import { createTheme } from '../helpers/themeHelper'

const themes = {
	blueberry: createTheme("#010812", "#0b212f", "#44586a", "#a2b4c3", "#cdd4db"),
	cupcake: createTheme("#0f7e9b", "#92d7ef", "#a2eae0", "#e4e0dc", "#f9acbb"),
	iceWater: createTheme("#112236", "#436280", "#a3bad2", "#dbe4ed", "#ffffff"),
}

class ThemeWrapper extends Component {
	state = {
		currentTheme: themes.blueberry,
	}

	render() {
		return (
			<ThemeProvider theme={this.state.currentTheme}>
				{this.props.children}
			</ThemeProvider>
		)
	}
}

export default ThemeWrapper
