export default ({onSave}) => {
	return (
		<form className="set-username" onSubmit={onSave}>
			<div className="pick-username">Pick a username:</div>
			<input type="text" className="username" />
			<button type="submit" className="submit">Next</button>
		</form>
	)
}