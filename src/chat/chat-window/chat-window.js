export default class ChatWindow extends React.Component {
	render() {
		let {messages, chatWith, sendMessage} = this.props;
		console.log("chatWith", chatWith);
		console.log("messages", messages);

		return (
			<div className="chat-window">
				<div className="messages">
					{messages[chatWith] && messages[chatWith].map(message => <div>{message}</div>)}
				</div>
				<form className="sender-message" onSubmit={this.props.sendMessage}>
					<input type="text" />
				</form>
			</div>
		)
	}
}