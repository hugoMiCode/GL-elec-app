const dropZone = document.getElementById('drop-zone');
const draggables = document.querySelectorAll('.draggable');

// Prevent default behavior when dragging over the drop zone
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Handle the drop event
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const type = e.dataTransfer.getData('text/plain');
    const object = createObject(type);
    
    // Position the object at the drop location
    const x = e.clientX - dropZone.offsetLeft;
    const y = e.clientY - dropZone.offsetTop;
    
    object.style.left = `${x}px`;
    object.style.top = `${y}px`;
    
    dropZone.appendChild(object);
});

// Make the draggable items respond to dragstart
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-type'));
    });
});

// Create the object element based on its type
function createObject(type) {
    const object = document.createElement('div');
    object.classList.add('object');
    
    if (type === 'circle') {
        object.textContent = '⚫';
    } else if (type === 'square') {
        object.textContent = '■';
    } else if (type === 'triangle') {
        object.textContent = '▲';
    }
    
    return object;
}
