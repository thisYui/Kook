import authService from '../services/authService.js';
import i18n from '../i18n.jsx';

// Keep reference to media query listener so we can remove it later
let _mq = null;
let _mqHandler = null;

function _setDarkClass(isDark) {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', !!isDark);
}

/**
 * Apply theme to the document.
 * - theme: 'light' | 'dark' | 'auto' | null/undefined
 * - returns a cleanup function to remove listeners (useful for unmounts)
 */
export function applyTheme(theme) {
    // remove previous listener
    if (_mq && _mqHandler) {
        if (_mq.removeEventListener) _mq.removeEventListener('change', _mqHandler);
        else _mq.removeListener(_mqHandler);
        _mq = null;
        _mqHandler = null;
    }

    // If theme is explicit
    if (theme === 'light' || theme === 'dark') {
        _setDarkClass(theme === 'dark');
        return () => {};
    }

    // For 'auto' or unset, follow OS preference and watch for changes
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = mq ? mq.matches : false;
    _setDarkClass(isDark);

    if (mq) {
        _mq = mq;
        _mqHandler = (e) => {
        _setDarkClass(e.matches);
        };
        if (mq.addEventListener) mq.addEventListener('change', _mqHandler);
        else mq.addListener(_mqHandler);
    }

    return () => {
        if (_mq && _mqHandler) {
        if (_mq.removeEventListener) _mq.removeEventListener('change', _mqHandler);
        else _mq.removeListener(_mqHandler);
        _mq = null;
        _mqHandler = null;
        }
    };
    }

    /**
     * Apply language to document and i18n instance (if available)
     */
    export function applyLanguage(language) {
    if (!language) return;

    if (typeof document !== 'undefined') {
        try {
        document.documentElement.lang = language;
        } catch (err) {
        // ignore in non-browser environments
        }
    }

    if (i18n && typeof i18n.changeLanguage === 'function') {
        i18n.changeLanguage(language).catch(() => {});
    }
}

/**
 * Load saved settings (via authService) and apply them to the UI.
 * Returns a cleanup function to remove any listeners (for theme 'auto').
 */
export default function loadAndApplySettings() {
    const theme = authService.getTheme();
    const language = authService.getLanguage();

    const cleanup = applyTheme(theme);
    applyLanguage(language);

    return cleanup;
}
