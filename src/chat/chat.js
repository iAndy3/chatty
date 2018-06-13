import People from './people/people';
import ChatWindow from './chat-window/chat-window';

import socket from '../commons/utils/websockets/socket';
import socketSubscribe from '../commons/utils/websockets/socket-subscribe';
export default class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: {},
			chatWith: ''
		};

		this.socket = socket.getInstance();
		this.sendMessage = this.sendMessage.bind(this);
		this.focusPerson = this.focusPerson.bind(this);
	}

	componentDidMount() {
		this.socket.send(JSON.stringify({type: 'CONNECTED', payload: this.props.username}));
		socketSubscribe.subscribe('chat', {
			GET_ME: ({uid, username}) => this.setState({uid}),
			NEW_MESSAGE: ({from, message}) => {
				this.setState(({messages}) => ({messages: Object.assign({}, messages, {[from]: [...messages[from] || [], message]})}));
			}
		});
	}

	focusPerson(chatWith) {
		this.setState({chatWith});
	}

	sendMessage(event) {
		event.preventDefault();

		this.socket.send(JSON.stringify({type: 'PRIVATE_MESSAGE', payload: {
			to: this.state.chatWith, 
			from: this.state.uid,
			message: event.target[0].value
		}}));
	}

	render() {
				console.log("this.state", this.state);
		return (
			<div className="chat-dashboard">
				<People focusPerson={this.focusPerson} />
				<ChatWindow sendMessage={this.sendMessage} chatWith={this.state.chatWith} messages={this.state.messages} />
			</div>
		)
	}
}