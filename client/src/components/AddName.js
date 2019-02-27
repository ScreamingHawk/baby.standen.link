import React, { Component } from 'react'
import styled from 'styled-components'

const StyledAddName = styled.div`
	width: 100%
	display: flex;
	flex-direction: row;
`

const StyledForm = styled.form`
	text-align: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
`

const StyledSending = styled.span`
	width: 100%;
	text-align: center;
	font-style: italic;
	font-size: 1.2em;
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
		return (
			<StyledAddName>
				{loaded ? (
					<StyledForm onSubmit={this.handleSubmit}>
						<input value={newName} onChange={this.updateNewName} />
						<button type="submit">Submit</button>
					</StyledForm>
				) : (
					<StyledSending>Sending...</StyledSending>
				)}
			</StyledAddName>
		)
	}
}

export default AddName
