import gameControl, {XBoxButton} from 'esm-gamecontroller.js';
import {store} from './store.js';

gameControl.on('connect', (gamepad) => {
	gamepad.before(XBoxButton.B, () => {
		if (document.hasFocus()) {
			store.toggleActive();
		}
	});
});
