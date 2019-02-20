import React, { Component } from 'react'
import styled from 'styled-components'

const StyledInfo = styled.div`
`

class Info extends Component {
	render() {
		return (
			<StyledInfo>
				<p>Coming Soon ...</p>
				<span>5<sup>th</sup> July 2019</span>
			</StyledInfo>
		)
	}
}

export default Info
