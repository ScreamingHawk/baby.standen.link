import React, { Component } from 'react'
import styled from 'styled-components'

import {
	hasVotedFor,
	addToVotedFor,
} from '../helpers/localStorage'

import Button from './base/Button'

const StyledRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin-top: 0.5em;
`
const StyledName = styled.div`
	font-size: 1.2em;
	font-weight: bold;
`
const SpacedDiv = styled.div`
	> * {
		margin: 0 0.5em;
	}
`

const ThumbsUp = (
	<span role="img" aria-label="vote">👍</span>
)

class VotableName extends Component {
	state = {
		votes: this.props.votes,
		loaded: true,
		voted: hasVotedFor(this.props.id),
	}

	addVote = (e) => {
		if (e){
			e.preventDefault();
		}
		this.setState({
			loaded: false,
			voted: true,
			votes: this.state.votes + 1,
		}, () => {
			fetch(`/names/${this.props.id}/vote`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					vote: 1,
				}),
			})
				.then(() => {
					addToVotedFor(this.props.id)
				})
				.then(() => this.setState({
					loaded: true,
					voted: true,
				}))
		})
	}

	render() {
		const {
			votes,
			voted,
		} = this.state;
		return (
			<StyledRow>
				<StyledName>{this.props.name}</StyledName>
				<SpacedDiv>
					<span>{votes}</span>
					{voted ? ThumbsUp : (
						<Button className="transparent" onClick={this.addVote}>
							{ThumbsUp}
						</Button>
					)}
				</SpacedDiv>
			</StyledRow>
		)
	}
}

export default VotableName
