import {WS_URL} from '../config';

const socket = (function() {
	let instance;

	function createInstance() {
		if(window.ReconnectingWebSocket) {
			return new window.ReconnectingWebSocket(WS_URL);
		} else if(window.WebSocket) {
			return new window.WebSocket(WS_URL);
		} else {
			return {};
		}
	}

	return {
		getInstance: function() {
			console.log("getInstance");
			if(!instance) {
				instance = createInstance();
			}
			return instance;
		}
	}
})();

export default socket;