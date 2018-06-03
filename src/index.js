import ReactDOM from 'react-dom';
import SetUsername from './set-username/set-username';
import Chat from './chat/chat';
import './style.scss';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: ''
		}

		this.setUsername = this.setUsername.bind(this);
	}

	setUsername(event) {
		event.preventDefault();
		const username = event.target[0].value.trim();
		this.setState({username});
	}

	render() {
		return(
			<div>
				{this.state.username ? <Chat username={this.state.username} /> : <SetUsername onSave={this.setUsername} />}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
