import type {MdSwitch} from '@material/web/switch/switch.js';
import {withController} from '@snar/lit';
import {html, LitElement} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement} from 'lit/decorators.js';
import {live} from 'lit/directives/live.js';
import {materialShellLoadingOff} from 'material-shell';
import {store} from '../store.js';
import styles from './app-shell.css?inline';

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

@customElement('app-shell')
@withStyles(styles)
@withController(store)
export class AppShell extends LitElement {
	firstUpdated() {
		materialShellLoadingOff.call(this);
	}

	render() {
		return html`<!-- -->
			<div
				class="flex items-center gap-3 cursor-pointer select-none"
				@click=${() => store.toggleActive()}
			>
				<md-switch
					?selected=${live(store.activated)}
					inert
					@change=${(event: Event) => {
						const switchie = event.target as MdSwitch;
						if (switchie.selected) {
							store.activated = true;
						} else {
							store.activated = false;
						}
					}}
				></md-switch>
				<span>Switch to right on focus</span>
			</div>
			<!-- -->`;
	}
}

export const app = (window.app = new AppShell());
