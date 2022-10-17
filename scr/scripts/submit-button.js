const createSubmitButton = () => {
    const button = document.createElement('button');

    button.type = 'submit';
    button.className = 'submit-button_disabled';
    button.id = 'submit-button';
    button.innerText = 'Отправить';
    button.disabled = true;
    
    return button;
}