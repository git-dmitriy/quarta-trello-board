export const toggleDarkMode = ({ btn, className = 'dark' }) => {
  const mode = window.localStorage.getItem('mode');
  let isFirstRender = false;

  if (!isFirstRender) {
    if (mode === 'dark') {
      setMode({ btn, mode: 'dark', className });
    }

    isFirstRender = true;
  }

  btn.addEventListener('click', () => {
    const mode = window.localStorage.getItem('mode');
    if (mode === 'dark') {
      setMode({ btn, mode: 'light', className });
    } else {
      setMode({ btn, mode: 'dark', className });
    }
  });
};

export const setMode = ({ btn, mode, className }) => {
  if (mode === 'dark') {
    document.body.classList.add(className);
    window.localStorage.setItem('mode', mode);
    btn.children[0].innerHTML = `<use xlink:href="img/icons/sprite.svg#light-mode" />`;
  }
  if (mode === 'light') {
    document.body.classList.remove(className);
    window.localStorage.setItem('mode', mode);
    btn.children[0].innerHTML = `<use xlink:href="img/icons/sprite.svg#dark-mode" />`;
  }
};
