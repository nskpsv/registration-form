class initValue {
    constructor() {
        this.err = '';
        this.value = '';
        this.touched = false;
        this.modified = false;
        this.valid = false;
    }
};

const initState = () => {
    Object.keys(state).forEach(key => state[key] = new initValue)
};

const state = {
    name: new initValue,
    lastName: new initValue,
    email: new initValue,
    password: new initValue,
    confirmPass: new initValue,
    birthDate: new initValue,
};

const popup = {
    password: {
        message: `- Минимальная длина пароля 8 символов<br>
        - Пароль должен содержать:<br>
        -- минимум одну цифру<br>
        -- минимум одну заглавную букву<br>
        -- минимум один спецсимвол (например: !"№_%-)`
    }
}