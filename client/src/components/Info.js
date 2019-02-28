import React, { Component } from 'react'
import styled from 'styled-components'

const StyledInfo = styled.div`
	p {
		margin: 0;
	}
`

class Info extends Component {
	render() {
		return (
			<StyledInfo>
				<p>Coming Soon ...</p>
				<p>5<sup>th</sup> July 2019</p>
			</StyledInfo>
		)
	}
}

export default Info
