import gameControl, {XBoxButton} from 'esm-gamecontroller.js';
import {callback, store} from './store.js';

gameControl.on('connect', (gamepad) => {
	let leftTriggerOn = false;
	gamepad.before(XBoxButton.LEFT_TRIGGER, () => {
		leftTriggerOn = true;
	});
	gamepad.after(XBoxButton.LEFT_TRIGGER, () => {
		leftTriggerOn = false;
	});
	gamepad.before(XBoxButton.B, () => {
		if (document.hasFocus()) {
			if (!leftTriggerOn) {
				store.toggleActivated();
			} else {
				store.toggleAutoActivateOnFocus();
			}
		}
	});
	gamepad.before(XBoxButton.Y, () => {
		store.activated = true;
		callback();
	});
});
