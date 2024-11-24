import type {MdSwitch} from '@material/web/switch/switch.js';
import {withController} from '@snar/lit';
import {html, LitElement} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement, query} from 'lit/decorators.js';
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
	@query('md-switch') mainSwitch: MdSwitch;
	firstUpdated() {
		materialShellLoadingOff.call(this);
	}

	updated() {
		this.mainSwitch.focus();
	}

	render() {
		return html`<!-- -->
			<div
				class="absolute inset-0 flex flex-col items-center justify-center gap-3 select-none"
			>
				<div
					class="flex items-center gap-3 cursor-pointer"
					@click=${() => store.toggleActivated()}
				>
					<md-switch
						icons
						?selected=${live(store.activated)}
						@click=${(event: PointerEvent) => event.preventDefault()}
					></md-switch>
					<span>Switch to right on focus</span>
				</div>

				<div
					class="flex items-center gap-3 cursor-pointer"
					@click=${() => store.toggleAutoActivateOnFocus()}
				>
					<md-switch
						icons
						?selected=${live(store.autoActivateOnFocus)}
						@click=${(event: PointerEvent) => event.preventDefault()}
					></md-switch>
					<span>Auto activate on focus</span>
				</div>
			</div>
			<!-- -->`;
	}
}

export const app = (window.app = new AppShell());
