export const navbar = ({ btn, backdrop, nav, backDropActiveClass }) => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      nav.style.transform = 'translateX(0px)';
      backdrop.style.opacity = '1';
    }, 0);

    backdrop.classList.toggle(backDropActiveClass);
  });

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
      setTimeout(() => {
        backdrop.classList.toggle(backDropActiveClass);
      }, 300);
      nav.style.transform = '';
      backdrop.style.opacity = '0';
    }
  });
};
