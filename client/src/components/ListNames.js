import React, { Component } from 'react'
import styled from 'styled-components'
import socketIOClient from 'socket.io-client'

import VotableName from './VotableName'
import ThumbsUp from './base/ThumbsUp'

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
		const socket = socketIOClient()
		socket.on('names', (names) => {
			this.setState({
				names: names.sort((a, b) => {
					return a.votes > b.votes ? -1 : 1
				}),
				loaded: true,
			})
		})
		socket.emit('request names')
	}

	render() {
		const {
			names,
			loaded
		} = this.state;
		return (
			<StyledListNames>
				<h1>It's a boy!!</h1>
				<p>
					<span>Vote for your fave name below by clicking the </span>
					<ThumbsUp />
				</p>
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
				<p><small>This site reloads automatically</small></p>
			</StyledListNames>
		)
	}
}

export default ListNames
