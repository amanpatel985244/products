function toggleTask(button) {
    const taskCard = button.closest('.task');
    const icon = button.querySelector('.task-toggle-icon');
    
    taskCard.classList.toggle('opacity-50');
    taskCard.classList.toggle('line-through');
    
    if (icon.getAttribute('fill') === 'currentColor') {
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
    } else {
        icon.setAttribute('fill', 'currentColor');
        icon.setAttribute('stroke', 'none');
    }
}
