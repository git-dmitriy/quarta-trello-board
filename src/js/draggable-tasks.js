import { v4 as uuidv4 } from 'uuid';

export const draggableTasks = ({ elSelector, dropzoneSelector }) => {
  const elements = document.querySelectorAll(elSelector);
  const dropzones = document.querySelectorAll(dropzoneSelector);

  dropzones.forEach((zone) => {
    zone.addEventListener('dragover', (event) => event.preventDefault());

    zone.addEventListener('drop', (event) => {
      console.log(event.target.classList);
      if (event.target.classList.contains(dropzoneSelector.slice(1))) {
        const id = event.dataTransfer.getData('text');

        const draggableElement = document.getElementById(id);
        const dropzone = event.target;
        dropzone.appendChild(draggableElement);
        event.dataTransfer.clearData();
      }
    });
  });

  elements.forEach((element) => {
    element.setAttribute('draggable', true);
    element.setAttribute('id', uuidv4());
    element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.id);
    });
  });
};
