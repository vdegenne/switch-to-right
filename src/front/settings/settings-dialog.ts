import '@mahmoodkhalil/material-web-3-demo/labs/gb/components/dialog/md-gb-dialog.js'
import type { MdDialog } from '@material/web/all.js'
import '@material/web/labs/gb/components/button/md-gb-button.js'
import '@material/web/labs/gb/components/slider/md-gb-slider.js'
import { SliderElement } from '@material/web/labs/gb/components/slider/slider-element.js'
import { withController } from '@snar/lit'
import { customElement } from 'custom-element-decorator'
import { html, LitElement } from 'lit'
import { withStyles } from 'lit-with-styles'
import { query, state } from 'lit/decorators.js'
import '../card-element.js'
import '../material/dialog-patch.js'
import '../material/item-patch.js'
import { store } from '../store.js'
import { renderThemeElements } from '../styles/theme-elements.js'
import { themeStore } from '../styles/themeStore.js'
import styles from './settings-dialog.css?inline'

@customElement({ name: 'settings-dialog', inject: true })
@withStyles(styles)
@withController(themeStore)
@withController(store)
export class SettingsDialog extends LitElement {
	@state() open = false

	@query('md-gb-dialog') dialog!: MdDialog

	render() {
		return html`
			<md-gb-dialog ?open=${this.open} @closed=${() => (this.open = false)}>
				<header slot="headline">Settings</header>

				<div class="flex flex-col gap-13 mt-6 px-3">
					<div>
						<div class="flex items-center justify-between mb-1">
							<span>Timer</span><span>${store.timerMs}ms</span>
						</div>
						<md-gb-slider
							size="md"
							step="10"
							min="300"
							max="1500"
							centered
							value="${store.timerMs}"
							labeled
							value-label="${store.timerMs}ms"
							class="w-full"
							@input="${(e: InputEvent) => {
								const slider = e.currentTarget as SliderElement
								store.timerMs = Number(slider.value)
							}}"
						>
							<md-gb-icon slot="icon">timer</md-gb-icon>
						</md-gb-slider>
					</div>
					<card-element headline="Theme">
						${renderThemeElements()}
					</card-element>
				</div>
				<form method="dialog" id="form" class=""></form>

				<md-gb-button slot="actions" form="form" autofocus>Close</md-gb-button>
			</md-gb-dialog>
		`
	}

	async show() {
		this.open = true
	}

	close(returnValue?: string) {
		return this.dialog.close(returnValue)
	}
}

declare global {
	interface Window {
		settingsDialog: SettingsDialog
	}
	interface HTMLElementTagNameMap {
		'settings-dialog': SettingsDialog
	}
}

export const settingsDialog = (window.settingsDialog = new SettingsDialog())
