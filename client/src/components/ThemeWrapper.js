import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import { createTheme } from '../helpers/themeHelper'

const themes = [
	//createTheme("blueberry", "#010812", "#0b212f", "#44586a", "#a2b4c3", "#cdd4db"),
	//createTheme("cupcake", "#0f7e9b", "#f9acbb", "#92d7ef", "#a2eae0", "#e4e0dc"),
	createTheme("ice water", "#112236", "#436280", "#a3bad2", "#dbe4ed", "#ffffff"),
]

class ThemeWrapper extends Component {
	state = {
		// Pick a random theme
		currentTheme: themes[Math.floor(Math.random() * themes.length)],
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
