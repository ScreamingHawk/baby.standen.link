import React, { Component } from 'react'
//import styled from 'styled-components'

class ListNames extends Component {
	state = {
		names: [],
	}

	componentDidMount() {
		this.getNames()
	}

	getNames = () => {
		fetch('/names')
			.then(res => res.json())
			.then(names => this.setState({
				names
			}))
	}

	render() {
		const { names } = this.state;
		return (
			<div>
				{names.length ? (
					<div>
						<ul>
							{names.map((name) =>
								<li key={name.id}>
									{name.name}
								</li>
							)}
						</ul>
					</div>
				) : (
					<div>
						<span>No names :(</span>
						<button
							onClick={this.getNames}>
							Retry?
						</button>
					</div>
				)}
			</div>
		)
	}
}

export default ListNames
