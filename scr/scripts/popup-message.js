const createMessage = (msg) => {
    const msgElement = document.createElement('div');

    msgElement.className = 'popup-message';
    msgElement.innerHTML = `
    <div class='popup-message__tail'></div>
    <div class='popup-message__text'>${msg}</div>
    `
    return msgElement;
}