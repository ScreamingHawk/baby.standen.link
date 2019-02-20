import React, { Component } from 'react'
import styled from 'styled-components'

const StyledLoading = styled.span`
	font-style: italic;
`

const StyledList = styled.ul`
	list-style: none;
	padding-left: 1.2em;
	color: ${({ theme }) => theme.text};
`

class ListNames extends Component {
	state = {
		names: [],
		loaded: false,
	}

	componentDidMount() {
		this.getNames()
	}

	getNames = () => {
		fetch('/names')
			.then(res => res.json())
			.then(names => this.setState({
				names,
				loaded: true,
			}))
	}

	render() {
		const {
			names,
			loaded
		} = this.state;
		return (
			<div>
				{names.length ? (
					<div>
						<StyledList>
							{names.map((name) =>
								<li key={name.id}>
									{name.name}
								</li>
							)}
						</StyledList>
					</div>
				) : (
					<div>
						{loaded ? (
							<div>
								<span>No names :(</span>
								<button
									onClick={this.getNames}>
									Retry?
								</button>
							</div>
						) : (
							<StyledLoading>Loading...</StyledLoading>
						)}
					</div>
				)}
			</div>
		)
	}
}

export default ListNames
