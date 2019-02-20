import React, { Component } from 'react'
import ListNames from './components/ListNames';
//import styled from 'styled-components'

class App extends Component {
	render() {
		return (
			<div>
				<header>
					<span>Name that baby!!</span>
				</header>
				<h1>Names</h1>
				<ListNames />
			</div>
		)
	}
}

export default App
