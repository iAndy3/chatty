import ReactDOM from 'react-dom';
import './style.scss';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 'Hello, World!'
		}
	}

	render() {
		return(
			<div>
				{this.state.value}
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
