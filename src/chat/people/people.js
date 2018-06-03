import socketSubscribe from '../../commons/utils/websockets/socket-subscribe';
import socket from '../../commons/utils/websockets/socket';

export default class People extends React.Component {
	constructor(props) {
		super(props);

		this.socket = socket.getInstance();
		this.state = {
			people: []
		}
	}

	componentDidMount() {
		this.socket.send(JSON.stringify({type: 'CONNECTED', payload: this.props.username}));
		socketSubscribe.subscribe('people', {
			GET_PEOPLE: people => this.setState({people})
		});
	}

	render() {
				console.log("this.state.people", this.state.people);
		return (
			<ul className="people">
				{this.state.people.map(person => <li key={person.uid}>{person.username}</li>)}
			</ul>
		)
	}
}