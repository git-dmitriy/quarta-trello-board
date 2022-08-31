export const handleEmptyStage = (selector) => {
  const stages = document.querySelectorAll(selector);
  const observer = new MutationObserver((record) => {
    const element = record[0].target;
    if (element.childElementCount === 0) {
      element.setAttribute('data-empty', 'data-empty');
    }
    if (element.childElementCount > 0) {
      element.removeAttribute('data-empty');
    }
  });

  stages.forEach((element) => {
    observer.observe(element, { childList: true });
    if (element.children.length === 0) {
      element.setAttribute('data-empty', 'data-empty');
    } else {
      element.removeAttribute('data-empty');
    }
  });
};
