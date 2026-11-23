interface HTMLElement {
	showPopover(options?: {source?: HTMLElement}): void
	hidePopover(): void
	togglePopover(force?: boolean, options?: {source?: HTMLElement}): void
}
