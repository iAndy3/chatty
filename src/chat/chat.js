import People from './people/people';

import socket from '../commons/utils/websockets/socket';
import socketSubscribe from '../commons/utils/websockets/socket-subscribe';
//<ChatWindow />
export default class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.socket = socket.getInstance();
		this.exposePeopleApi = this.exposePeopleApi.bind(this);
	}

	componentDidMount() {
		this.socket.send(JSON.stringify({type: 'CONNECTED', payload: this.props.username}));
		socketSubscribe.subscribe('chat', {
			NEW_MESSAGE: msg => console.log(msg)
		});
	}

	exposePeopleApi(api) {
		this.peopleApi = api;
	}

	render() {
		return (
			<div className="chat-dashboard">
				<People {...this.props} exposeApi={this.exposePeopleApi} focus={this.focusPerson}/>
				<button onClick={() => this.peopleApi.sendMessage('tanga')}>Send</button>
			</div>
		)
	}
}