import socketSubscribe from '../../commons/utils/websockets/socket-subscribe';

export default class People extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			people: []
		}
	}

	componentDidMount() {
		socketSubscribe.subscribe('people', {
			GET_PEOPLE: people => this.setState({people})
		});
	}

	render() {
		return (
			<ul className="people">
				{this.state.people.map(person => <li onClick={() => this.props.focus(person.uid)} key={person.uid}>{person.username}</li>)}
			</ul>
		)
	}
}