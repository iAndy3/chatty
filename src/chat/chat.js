import People from './people/people';
//<ChatWindow />
export default class Chat extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="chat-dashboard">
				<People {...this.props} />

			</div>
		)
	}
}