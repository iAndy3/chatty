import People from './people/people';

import socket from '../commons/utils/websockets/socket';
import socketSubscribe from '../commons/utils/websockets/socket-subscribe';
//<ChatWindow />
export default class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chatWith: ''
		};

		this.socket = socket.getInstance();
		this.focusPerson = this.focusPerson.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	componentDidMount() {
		this.socket.send(JSON.stringify({type: 'CONNECTED', payload: this.props.username}));
		socketSubscribe.subscribe('chat', {
			NEW_MESSAGE: msg => console.log(msg)
		});
	}

	focusPerson(chatWith) {
		this.setState({chatWith});
	}

	sendMessage() {
		this.socket.send(JSON.stringify({type: 'PRIVATE_MESSAGE', payload: {
			to: this.state.chatWith, 
			message: 'Salutare'
		}}));
	}

	render() {
		return (
			<div className="chat-dashboard">
				<People {...this.props} focus={this.focusPerson}/>
				<button onClick={this.sendMessage}>Send</button>
			</div>
		)
	}
}