import {ReactiveController, state} from '@snar/lit';
import {type PropertyValues} from 'lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import {app} from './app-shell/app-shell.js';
import {sleep} from './utils.js';
import {toast} from 'toastit';

window.addEventListener('activate-switch-to-right', () => {
	store.activated = true;
});
window.addEventListener('deactivate-switch-to-right', () => {
	store.activated = false;
});
window.addEventListener('toggle-switch-to-right', () => {
	store.toggleActivated();
});

export function callback() {
	fetch('http://localhost:8005/switch_to_right_workspace');
}

/**
 * Sleep but will reject if the page lost focus.
 */
function tryToSleep(timeMs = 1000, checkMs = 50): Promise<void> {
	return new Promise(async (resolve, reject) => {
		for (let i = 0; i <= timeMs; i += checkMs) {
			if (!store.activated || !document.hasFocus()) {
				reject();
				return;
			}
			await sleep(checkMs);
		}
		resolve();
	});
}

let n = 0;
async function focusCallback() {
	toast(++n);
	app.mainSwitch.focus();
	if (!store.activated && store.autoActivateOnFocus) {
		store.activated = true;
		return;
	}
	try {
		// ✟ await sleep(900);
		await tryToSleep(900);
	} catch {
		// app lost focus, ignore...
		return;
	}
	callback();
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
