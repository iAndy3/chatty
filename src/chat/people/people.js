import socketSubscribe from '../../commons/utils/websockets/socket-subscribe';
import socket from '../../commons/utils/websockets/socket';

export default class People extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			people: []
		};

		this.socket = socket.getInstance();
	}

	componentDidMount() {
		socketSubscribe.subscribe('people', {
			GET_PEOPLE: people => this.setState({people})
		});
	}

	render() {
		return (
			<ul className="people">
				{this.state.people.map(person => <li onClick={() => this.props.focusPerson(person.uid)} key={person.uid}>{person.username}</li>)}
			</ul>
		)
	}
}