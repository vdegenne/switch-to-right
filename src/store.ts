import {ReactiveController, state} from '@snar/lit';
import {type PropertyValues} from 'lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {app} from './app-shell/app-shell.js';
import {sleep} from './utils.js';

window.addEventListener('activate-switch-to-right', () => {
	store.activated = true;
});
window.addEventListener('deactivate-switch-to-right', () => {
	store.activated = false;
});
window.addEventListener('toggle-switch-to-right', () => {
	store.toggleActivated();
});

async function focusCallback() {
	app.mainSwitch.focus();
	if (!store.activated && store.autoActivateOnFocus) {
		store.toggleActivated();
	}
	await sleep(500);
	if (!store.activated) {
		return;
	}
	fetch('http://localhost:8005/switch_to_right_workspace');
}

@saveToLocalStorage('switch-to-right')
export class AppStore extends ReactiveController {
	@state() activated = false;
	@state() autoActivateOnFocus = false;

	firstUpdated() {
		this.activated = false;
		window.addEventListener('focus', focusCallback);
	}

	updated(changed: PropertyValues<this>) {
		if (changed.has('activated')) {
			if (this.activated) {
				focusCallback();
			} else {
				// window.removeEventListener('focus', focusCallback);
			}
		}
	}

	toggleActivated() {
		this.activated = !this.activated;
	}
	toggleAutoActivateOnFocus() {
		this.autoActivateOnFocus = !this.autoActivateOnFocus;
	}
}

export const store = new AppStore();
