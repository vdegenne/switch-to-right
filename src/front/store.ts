import { PropertyValues, ReactiveController, state } from '@snar/lit'
import { FormBuilder } from '@vdegenne/forms'
import { saveToLocalStorage } from 'snar-save-to-local-storage'
import { Page } from './pages/index.js'
import { cancelSwitch, switchToRightDebounce } from './switcher.js'

@saveToLocalStorage('switch-to-right:store')
export class AppStore extends ReactiveController {
	@state() page: Page = 'main'

	@state() switchOnFocus = false
	@state() autoActivate = false

	@state() timerMs = 1000

	F = new FormBuilder(this)

	protected updated(changed: PropertyValues<this>) {
		if (changed.has('switchOnFocus')) {
			if (this.switchOnFocus) {
				switchToRightDebounce()
			} else {
				cancelSwitch()
			}
		}
	}
}

export const store = new AppStore()

// @ts-ignore
window.store = store
