import {getThemeStore} from './imports.js';
import {store} from './store.js';

window.addEventListener('keydown', async (e) => {
	if (e.altKey || e.ctrlKey) {
		return;
	}
	const target = e.composedPath()[0] as Element;
	if (['TEXTAREA', 'INPUT'].includes(target.tagName)) {
		return;
	}
	if (e.key === 'd') {
		(await getThemeStore()).toggleMode();
	}
});

window.addEventListener('click', (e: MouseEvent) => {
	const src = e.composedPath()[0] as HTMLElement;
	if (src.getAttribute('id') === 'wrapper') {
		store.toggleActivated();
	}
});

export {};
