import mahmoodStyles from '@mahmoodkhalil/material-web-3-demo/labs/gb/styles/m3.cssresult.js'
import '@material/mwc-top-app-bar'
import '@material/web/labs/gb/components/appbar/md-gb-app-bar.js'
import '@material/web/labs/gb/components/iconbutton/md-gb-icon-button.js'
import { ListItemElement } from '@material/web/labs/gb/components/list/list-item-element.js'
import '@material/web/labs/gb/components/list/md-gb-list-item.js'
import '@material/web/labs/gb/components/list/md-gb-list.js'
import '@material/web/labs/gb/components/switch/md-gb-switch.js'
import { adoptStyles } from '@material/web/labs/gb/styles/adopt-styles.js'
import '@material/web/labs/gb/styles/icon/md-gb-icon.js'
import m3Styles from '@material/web/labs/gb/styles/m3.cssresult.js'
import { withController } from '@snar/lit'
import { html, LitElement } from 'lit'
import { withStyles } from 'lit-with-styles'
import { customElement, query } from 'lit/decorators.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { SVG_LOGO } from '../assets/assets.js'
import { openSettingsDialog } from '../imports.js'
import { store } from '../store.js'
import styles from './app-shell.css?inline'

adoptStyles(document, [m3Styles, mahmoodStyles])

declare global {
	interface Window {
		app: AppShell
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell
	}
}

@customElement('app-shell')
@withStyles(styles)
@withController(store)
export class AppShell extends LitElement {
	@query('md-gb-list-item') firstListItem!: ListItemElement
	// get firstListItem() {
	// 	return this.renderRoot.querySelector('md-gb-list-item')!
	// }

	render() {
		return html`<!-- -->
			<md-gb-app-bar style="" class="fixed" tabindex="-1">
				<md-gb-icon-button slot="leading" inert>
					<md-gb-icon>${unsafeSVG(SVG_LOGO)}</md-gb-icon>
				</md-gb-icon-button>
				<md-gb-icon-button slot="trailing" @click="${openSettingsDialog}">
					<md-gb-icon>settings</md-gb-icon>
				</md-gb-icon-button>
			</md-gb-app-bar>
			<div class="flex-1 flex flex-col gap-0 items-center justify-center">
				<md-gb-list segmented>
					<md-gb-list-item
						@click="${() => (store.switchOnFocus = !store.switchOnFocus)}"
					>
						<md-gb-switch
							inert
							slot="leading"
							?selected=${store.switchOnFocus}
						></md-gb-switch>
						Switch to right on focus
					</md-gb-list-item>
					<md-gb-list-item
						@click="${() => (store.autoActivate = !store.autoActivate)}"
					>
						<md-gb-switch
							inert
							slot="leading"
							?selected=${store.autoActivate}
						></md-gb-switch>
						Activate on focus
					</md-gb-list-item>
				</md-gb-list>
			</div>
			<!-- -->`
	}
}
