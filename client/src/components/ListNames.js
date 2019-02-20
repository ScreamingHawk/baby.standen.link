import React, { Component } from 'react'
import styled from 'styled-components'
import VotableName from './VotableName';

const StyledListNames = styled.div`
	text-align: center;
	max-width: 400px;
	margin: auto;
`

const StyledLoading = styled.span`
	font-style: italic;
	font-size: 1.2em;
`

const StyledList = styled.ul`
	list-style: none;
	padding-left: 0;
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
		this.setState({
			loaded: false,
		}, () => {
			fetch('/names')
				.then(res => res.json())
				.then(names => this.setState({
					names,
					loaded: true,
				}))
		})
	}

	render() {
		const {
			names,
			loaded
		} = this.state;
		return (
			<StyledListNames>
				<h1>Names</h1>
				{names.length ? (
					<StyledList>
						{names.map((name) =>
							<li key={name.id}>
								<VotableName {...name} />
							</li>
						)}
					</StyledList>
				) : (
					<div>
						{loaded ? (
							<div>
								<span>No names :(</span>
							</div>
						) : (
							<StyledLoading>Loading...</StyledLoading>
						)}
					</div>
				)}
				{loaded && (
					<button
						onClick={this.getNames}>
						Reload
					</button>
				)}
			</StyledListNames>
		)
	}
}

export default ListNames
