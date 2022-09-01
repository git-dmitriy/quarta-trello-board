import { navbar } from './navbar';
import { toggleDarkMode } from './darkmode';
import { handleEmptyStage } from './handleEmptyStage';
import { draggableTasks } from './draggable-tasks';

const btn = document.querySelector('.floating-btn');
const backdrop = document.querySelector('.backdrop');
const nav = document.querySelector('.settings-wrapper');
const nightModeSwitcher = document.querySelector('[data-night-mode-switcher]');

navbar({ btn, backdrop, nav, backDropActiveClass: 'backdrop_show' });

toggleDarkMode({ btn: nightModeSwitcher, className: 'dark' });

handleEmptyStage('.task-list');

draggableTasks({ elSelector: '.task-item', dropzoneSelector: '.task-list' });
