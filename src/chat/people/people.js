import socketSubscribe from '../../commons/utils/websockets/socket-subscribe';
import socket from '../../commons/utils/websockets/socket';

export default class People extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			people: [],
			chatWith: ''
		};

		this.socket = socket.getInstance();
		this.focusPerson = this.focusPerson.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	componentDidMount() {
		socketSubscribe.subscribe('people', {
			GET_PEOPLE: people => this.setState({people})
		});

		this.props.exposeApi({
			sendMessage: this.sendMessage
		});
	}

	focusPerson(chatWith) {
		this.setState({chatWith});
	}

	sendMessage(message) {
		this.socket.send(JSON.stringify({type: 'PRIVATE_MESSAGE', payload: {
			to: this.state.chatWith, 
			message
		}}));
	}

	render() {
		return (
			<ul className="people">
				{this.state.people.map(person => <li onClick={() => this.focusPerson(person.uid)} key={person.uid}>{person.username}</li>)}
			</ul>
		)
	}
}