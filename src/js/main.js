import { navbar } from './navbar';

const btn = document.querySelector('.floating-btn');
const backdrop = document.querySelector('.backdrop');
const nav = document.querySelector('.settings-wrapper');
navbar({ btn, backdrop, nav, backDropActiveClass: 'backdrop_show' });
