export const handleEmptyStage = (selector) => {
  const stages = document.querySelectorAll(selector);

  const observer = new MutationObserver(() => {
    stages.forEach((element) => {
      setDataEmptyAttr(element);
    });
  });

  stages.forEach((element) => {
    observer.observe(element, { childList: true });
    setDataEmptyAttr(element);
  });
};

const setDataEmptyAttr = (element) => {
  if (element.children.length === 0) {
    element.setAttribute('data-empty', 'data-empty');
  } else {
    element.removeAttribute('data-empty');
  }
};
