import React, { Component } from 'react'
import styled from 'styled-components'

import {
	hasVotedFor,
	addToVotedFor,
} from '../helpers/localStorage'

import Button from './base/Button'
import ThumbsUp from './base/ThumbsUp'

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

class VotableName extends Component {
	state = {
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
			voted,
		} = this.state;
		const {
			name,
			votes,
		} = this.props;
		return (
			<StyledRow>
				<StyledName>{name}</StyledName>
				<SpacedDiv>
					<span>{votes}</span>
					{voted ? (
						<ThumbsUp />
					) : (
						<Button className="transparent" onClick={this.addVote}>
							<ThumbsUp />
						</Button>
					)}
				</SpacedDiv>
			</StyledRow>
		)
	}
}

export default VotableName
