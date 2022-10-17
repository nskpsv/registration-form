const nameValidator = value => {
    if (value === '') {
        return {
            result: false,
            err: 'Обязательне поле'
        }
    }
    if (value.length > 35) {
        return {
            result: false,
            err: 'Длина может быть от 1 до 35 символов'
        }
    }
    if (/[^а-яёa-z-]/gi.test(value)) {
        return {
            result: false,
            err: 'Имя может содержать только буквы и символ "-"'
        }
    }

    return {
        result: true,
        err: ''
    }
};

const emailValidator = value => {
    if (value === '') {
        return {
            result: false,
            err: 'Обязательне поле'
        }
    }

    if (/\b\w+@\w+\.\w+\b/gi.test(value)) {
        return {
            result: true,
            err: ''
        }
    } else {
        return {
            result: false,
            err: 'Введите корректный email. Например example@domain.ru'
        }
    }
}

const passwordValidator = (value, showPopup) => {
    if (value === '') {
        showPopup(false);
        return {
            result: false,
            err: 'Обязательне поле'
        }
    }

    if (!/[^\s\w]|_/.test(value) || !/\d/.test(value) || !/[A-ZА-ЯЁ]/.test(value) || value.length < 8) {
        showPopup(true);
        return {
            result: false,
            err: 'Пароль должен удовлетворять условиям'
        }
    }

    showPopup(false);
    return {
        result: true,
        err: ''
    }
}

const confirmPasswordValidator = value => {
    if (value === '') {
        return {
            result: false,
            err: 'Обязательне поле'
        }
    }

    if (value !== state.password.value) {
        return {
            result: false,
            err: 'Пароли не совпадают'
        }
    }

    return {
        result: true,
        err: ''
    }
}

const birthDateValidator = value => {

    const [year, month, day] = value.split('-');
    const now = new Date;
    const diffY = now.getFullYear() - year;
    const diffM = now.getMonth() + 1 - month;
    const diffD = now.getDate() - day;

    const notValid = {
        result: false,
        err: 'Вам меньше 18 лет'
    };
    const valid = {
        result: true,
        err: ''
    }

    if (value === '') {
        return {
            result: false,
            err: 'Обязательне поле'
        }
    }
    
    if (diffY < 18) { return notValid }

    if (diffY === 18) {
        if (diffM < 0) { return notValid }
        if (diffM > 0) { return valid }
        if (diffM === 0) { return diffD > 0 ? valid : notValid }
    }

    return {
        result: true,
        err: ''
    }
}

const isValidForm = () => {
    return (
        state.name.valid &&
        state.lastName.valid &&
        state.email.valid &&
        state.password.valid &&
        state.confirmPass.valid &&
        state.birthDate.valid
    )
};