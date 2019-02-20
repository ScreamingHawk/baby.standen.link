import React, { Component } from 'react'
import ThemeWrapper from './components/ThemeWrapper'
import Header from './components/Header'
import ListNames from './components/ListNames'

class App extends Component {
	render() {
		return (
			<ThemeWrapper>
				<div>
					<Header />
					<h1>Names</h1>
					<ListNames />
				</div>
			</ThemeWrapper>
		)
	}
}

export default App
