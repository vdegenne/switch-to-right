import {sleep} from './utils.js';
import {store} from './store.js';

async function focusCallback() {
	await sleep(500);
	if (!store.activated) {
		return;
	}
	fetch('http://localhost:8005/switch_to_right_workspace');
}
function activateFocusFunc() {
	store.activated = true;
	window.addEventListener('focus', focusCallback);
}
function deactivateFocusFunc() {
	store.activated = false;
	window.removeEventListener('focus', focusCallback);
}
function toggleFocus() {
	if (!store.activated) {
		activateFocusFunc();
		focusCallback();
	} else {
		deactivateFocusFunc();
	}
}

// function rerender() {
// 	render(
// 		html`<!-- -->
// 			<label style="display:flex;align-items:center;gap:10px">
// 				<md-switch
// 					?selected=${sto}
// 					@change=${(event: Event) => {
// 						const switchie = event.target as MdSwitch;
// 						if (switchie.selected) {
// 							activateFocusFunc();
// 						} else {
// 							deactivateFocusFunc();
// 						}
// 					}}
// 				></md-switch>
// 				<span>Switch to right on focus</span>
// 			</label>
// 			<!-- -->`,
// 		document.body,
// 	);
// }
