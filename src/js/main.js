import { navbar } from './navbar';
import { toggleDarkMode } from './darkmode';

const btn = document.querySelector('.floating-btn');
const backdrop = document.querySelector('.backdrop');
const nav = document.querySelector('.settings-wrapper');
const nightModeSwitcher = document.querySelector('[data-night-mode-switcher]');

navbar({ btn, backdrop, nav, backDropActiveClass: 'backdrop_show' });

toggleDarkMode({ btn: nightModeSwitcher, className: 'dark' });

