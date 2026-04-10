/**
 * Custom VitePress theme with Mermaid fullscreen support
 * Based on: https://github.com/shuji-bonji/ai-agent-architecture
 */
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import './custom.css';

let dialog: HTMLDialogElement | null = null;

function createDialog(): HTMLDialogElement {
	if (dialog) return dialog;

	dialog = document.createElement('dialog');
	dialog.className = 'mermaid-fullscreen-dialog';
	dialog.innerHTML = `
		<div class="dialog-content">
			<button class="dialog-close" aria-label="Close">&times;</button>
			<div class="dialog-svg-container"></div>
		</div>
	`;
	document.body.appendChild(dialog);

	// Close handlers
	const closeBtn = dialog.querySelector('.dialog-close')!;
	closeBtn.addEventListener('click', () => closeDialog());
	dialog.addEventListener('click', (e) => {
		if (e.target === dialog) closeDialog();
	});
	dialog.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeDialog();
	});

	return dialog;
}

let panZoomInstance: any = null;

function closeDialog() {
	if (panZoomInstance) {
		panZoomInstance.destroy();
		panZoomInstance = null;
	}
	if (dialog) {
		const container = dialog.querySelector('.dialog-svg-container')!;
		container.innerHTML = '';
		dialog.close();
	}
}

async function openFullscreen(svg: SVGElement) {
	const dlg = createDialog();
	const container = dlg.querySelector('.dialog-svg-container')!;
	container.innerHTML = '';

	// Clone SVG
	const clonedSvg = svg.cloneNode(true) as SVGElement;

	// Rename ID to avoid conflicts during Mermaid re-render
	const originalId = clonedSvg.id;
	if (originalId) {
		const newId = originalId + '-dialog';
		clonedSvg.id = newId;
		// Update style references
		const styles = clonedSvg.querySelectorAll('style');
		styles.forEach((style) => {
			style.textContent = (style.textContent || '').replace(
				new RegExp(`#${originalId}`, 'g'),
				`#${newId}`,
			);
		});
	}

	container.appendChild(clonedSvg);
	dlg.showModal();

	// Apply svg-pan-zoom
	try {
		const svgPanZoom = (await import('svg-pan-zoom')).default;
		panZoomInstance = svgPanZoom(clonedSvg, {
			zoomEnabled: true,
			controlIconsEnabled: true,
			fit: true,
			center: true,
			minZoom: 0.1,
			maxZoom: 20,
		});
	} catch {
		// svg-pan-zoom not available, still works without zoom
	}
}

function initMermaidContainers() {
	const containers = document.querySelectorAll('.mermaid');
	containers.forEach((container) => {
		if ((container as any).__mermaidInit) return;
		(container as any).__mermaidInit = true;

		container.addEventListener('click', () => {
			const svg = container.querySelector('svg');
			if (svg) openFullscreen(svg);
		});
	});
}

// Watch for dark mode changes and update dialog if open
function watchThemeChanges() {
	const observer = new MutationObserver(() => {
		if (dialog?.open) {
			// Re-clone SVG after Mermaid re-renders for new theme
			setTimeout(() => {
				// Dialog will be reopened by user if needed
			}, 500);
		}
	});

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class'],
	});
}

// SPA navigation support
function setupNavigationWatcher() {
	let debounceTimer: ReturnType<typeof setTimeout>;

	const observer = new MutationObserver(() => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			initMermaidContainers();
		}, 300);
	});

	const content = document.querySelector('.VPContent');
	if (content) {
		observer.observe(content, {
			childList: true,
			subtree: true,
		});
	}
}

export default {
	extends: DefaultTheme,
	enhanceApp() {
		// No additional app-level enhancements needed
	},
	setup() {
		if (typeof window !== 'undefined') {
			// Wait for initial render
			setTimeout(() => {
				initMermaidContainers();
				watchThemeChanges();
				setupNavigationWatcher();
			}, 500);
		}
	},
} satisfies Theme;
