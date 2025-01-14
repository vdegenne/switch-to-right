import gameControl, {XBoxButton} from 'esm-gamecontroller.js';
import {callback, store} from './store.js';
import {sleep} from './utils.js';

// export let gamepad_connected = false;
let focus = false;
async function onFocus() {
	await sleep(100);
	focus = true;
}
onFocus();

window.addEventListener('focus', onFocus);
window.addEventListener('blur', () => {
	focus = false;
});

function shouldExecute() {
	return document.hasFocus();
}

gameControl.on('connect', (gamepad) => {
	let leftTriggerOn = false;
	let rightTriggerOn = false;
	gamepad.before(XBoxButton.LEFT_TRIGGER, () => {
		leftTriggerOn = true;
	});
	gamepad.after(XBoxButton.LEFT_TRIGGER, () => {
		leftTriggerOn = false;
	});
	gamepad.before(XBoxButton.RIGHT_TRIGGER, () => {
		rightTriggerOn = true;
	});
	gamepad.after(XBoxButton.RIGHT_TRIGGER, () => {
		rightTriggerOn = false;
	});
	gamepad.before(XBoxButton.B, () => {
		if (shouldExecute()) {
			if (!leftTriggerOn) {
				store.toggleActivated();
			} else {
				store.toggleAutoActivateOnFocus();
			}
		}
	});
	gamepad.after(XBoxButton.Y, () => {
		if (shouldExecute()) {
			store.activated = true;
			callback();
		}
	});
});
