const formElement = document.querySelector('.form');

const checkForm = () => {

    const button = formElement.querySelector('#submit-button');

    if (isValidForm()) {
        button.disabled = false;
        button.className = 'submit-button';
    } else {
        button.disabled = true;
        button.className = 'submit-button_disabled';
    }
};

formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    Array.from(formElement.elements)
        .filter(({ value }) => !!value)
        .forEach(({ name, value }) => console.log({ name, value }));
    clearForm();
});

const clearForm = () => {

    const fields = Array.from(document.getElementsByClassName('field'));

    fields.forEach(field => {

        const input = field.querySelector('input');
        const label = field.querySelector('label');
        const err = field.querySelector('span');

        input.style.display = 'none';
        input.style.opacity = '0';
        err.innerHTML = '';
        label.style.fontSize = 'var(--label-font-size-l)';
        label.style.lineHeight = 'var(--label-font-size-s)';
        label.style.marginTop = 'calc(var(--field-height) / 2 - (var(--label-font-size-l) / 2))';
        field.style.borderLeft = 'none';
    });
    
    initState();
};

formElement.appendChild(createField({
    state: state.name,
    label: 'Имя',
    name: 'name',
    type: 'text',
    validator: nameValidator
}));

formElement.appendChild(createField({
    state: state.lastName,
    label: 'Фамилия',
    name: 'lastName',
    type: 'text',
    validator: nameValidator
}));

formElement.appendChild(createField({
    state: state.email,
    label: 'Email',
    name: 'email',
    type: 'email',
    validator: emailValidator
}));

formElement.appendChild(createField({
    state: state.password,
    label: 'Пароль',
    name: 'password',
    type: 'password',
    popupState: popup.password,
    validator: passwordValidator
}));

formElement.appendChild(createField({
    state: state.confirmPass,
    label: 'Повторите пороль',
    name: 'confirmPass',
    type: 'password',
    validator: confirmPasswordValidator
}));

formElement.appendChild(createField({
    state: state.birthDate,
    label: 'Дата рождения',
    name: 'birthDate',
    type: 'date',
    validator: birthDateValidator
}));

const buttons = document.createElement('div');
buttons.className = 'buttons';

buttons.appendChild(createSubmitButton());


formElement.appendChild(buttons);