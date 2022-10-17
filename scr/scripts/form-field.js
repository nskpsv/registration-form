const createField = ({ state, label, name, type, validator, popupState = '' }) => {
    const fieldElement = document.createElement('div');

    fieldElement.className = 'field';
    fieldElement.innerHTML = `
    <label class='field__label'>${label}</label>
    <span class='field__error-message'>${state.err}</span>
    <input class='field__input' value='${state.value}' name='${name}' type='${type}' />
    `;

    const inputElement = fieldElement.querySelector('.field__input');
    const labelElement = fieldElement.querySelector('.field__label');
    let popup = null;

    const showPopup = (visible) => {
        if (visible) {
        popup.style.display = 'block';
        popup.style.opacity = '100';
        popup.style.top = '-100px';
        } else {
            popup.style.display = 'none';
        }
    };

    fieldElement.addEventListener('click', () => {
            inputElement.style.display = 'inline-block';
            inputElement.style.opacity = '1';
            inputElement.focus();
            labelElement.style.fontSize = 'var(--label-font-size-s)';
            labelElement.style.lineHeight = 'var(--label-font-size-s)';
            labelElement.style.marginTop = 'calc(var(--field-width) * .01)';
            fieldElement.style.borderLeft = '9px solid #A9A9A9';
    });

    inputElement.addEventListener('focus', () => fieldElement.click());
    
    inputElement.addEventListener('input', (e) => {
        if (!state.modified) {
        fieldElement.style.borderLeft = '9px solid #A9A9A9';
        }
        state.value = e.currentTarget.value;
        state.modified = true;
    });

    inputElement.addEventListener('blur', () => {
            const { result, err } = validator(state.value, showPopup);
            state.valid = result;
            state.err = err;
        
        if (state.valid) {
            fieldElement.style.borderLeft = '9px solid #21d940';
            fieldElement.querySelector('span').innerHTML = state.err;
            state.modified = false;
        } else {
            fieldElement.style.borderLeft = '9px solid #D93F21';
            fieldElement.querySelector('span').innerHTML = state.err;
            state.modified = false;
        }

        checkForm();
    });

    if (popupState) {
        popup = createMessage(popupState.message);

        fieldElement.appendChild(popup);

        inputElement.addEventListener('focus', () => {
            if (!state.touched) {
                showPopup(true);
            }
        });

        inputElement.addEventListener('blur', () => {
            if (!state.touched) {
            showPopup(false);
            state.touched = true;
            }
        });
    }

    return fieldElement;
};