import {ReactiveController, state} from '@snar/lit';
import {type PropertyValues} from 'lit';
import {sleep} from './utils.js';
// import {saveToLocalStorage} from 'snar-save-to-local-storage';

window.addEventListener('deactivate-switch-to-right', () => {
	console.log('it works');
	store.activated = false;
});

async function focusCallback() {
	await sleep(500);
	if (!store.activated) {
		return;
	}
	fetch('http://localhost:8005/switch_to_right_workspace');
}

// @saveToLocalStorage('switch-to-right')
export class AppStore extends ReactiveController {
	@state() activated = false;

	updated(changed: PropertyValues<this>) {
		if (changed.has('activated')) {
			if (this.activated) {
				window.addEventListener('focus', focusCallback);
				focusCallback();
			} else {
				window.removeEventListener('focus', focusCallback);
			}
		}
	}

	toggleActive() {
		this.activated = !this.activated;
	}
}

export const store = new AppStore();
