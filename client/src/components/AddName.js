import React, { Component } from 'react'
import styled from 'styled-components'

import Button from './base/Button'
import Input from './base/Input'

const StyledAddName = styled.div`
	width: 100%
	display: flex;
	flex-direction: column;
`

const StyledForm = styled.form`
	text-align: center;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
`

const StyledSending = styled.span`
	width: 100%;
	text-align: center;
	font-style: italic;
	font-size: 1.2em;
`

const StyledWarning = styled.span`
	width: 100%;
	text-align: center;
	font-style: bold;
	font-size: 1.2em;
	color: ${({ theme }) => theme.error};
`

class AddName extends Component {
	state = {
		loaded: true,
		newName: "",
	}

	updateNewName = (e) => {
		this.setState({
			newName: e.target.value,
		})
	}

	handleSubmit = (e) => {
		if (e){
			e.preventDefault();
		}
		const { newName } = this.state
		if (newName === ""){
			return
		}
		this.setState({
			loaded: false,
		}, () => {
			fetch('/names', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: newName,
				}),
			})
				.then(() => this.setState({
					loaded: true,
					newName: "",
				}))
		})
	}

	render() {
		const {
			loaded,
			newName,
		} = this.state;
		const warn = newName.length >= 20
		return (
			<StyledAddName>
				{loaded ? (
					<StyledForm onSubmit={this.handleSubmit}>
						<Input
							value={newName}
							placeholder="Make a suggestion"
							onChange={this.updateNewName} />
						<Button
								disabled={warn}
								type="submit">
							Submit
						</Button>
					</StyledForm>
				) : (
					<StyledSending>Sending...</StyledSending>
				)}
				{warn && (
					<StyledWarning>Name too long</StyledWarning>
				)}
			</StyledAddName>
		)
	}
}

export default AddName
