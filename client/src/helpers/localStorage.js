const hasLocalStorage = typeof(Storage) !== "undefined"
let votedFor = []

if (hasLocalStorage){
	votedFor = JSON.parse(localStorage.getItem("votedFor")) || []
}

export const addToVotedFor = (nameId) => {
	votedFor.push(nameId)
	if (hasLocalStorage){
		localStorage.setItem("votedFor", JSON.stringify(votedFor))
	}
}

export const hasVotedFor = (nameId) => {
	return votedFor.includes(nameId)
}
