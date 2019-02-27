import React, { Component } from 'react'
import styled from 'styled-components'

const StyledName = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`

const ThumbsUp = (
	<span role="img" aria-label="vote">👍</span>
)

class VotableName extends Component {
	state = {
		votes: this.props.votes,
		loaded: true,
		voted: false,
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
			<StyledName>
				<span>{this.props.name}</span>
				<div>
					<span>{votes}</span>
					{voted ? ThumbsUp : (
						<button onClick={this.addVote}>
							{ThumbsUp}
						</button>
					)}
				</div>
			</StyledName>
		)
	}
}

export default VotableName
