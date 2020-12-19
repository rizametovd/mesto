
// Функция: показать ошибки
function showError(form, input, config) {
    const error = form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
}

// Функция: скрыть ошибки
function hideError(form, input, config) {
    const error = form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
}

// Функция проверки валидности инпутов
function checkInputValidity(form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config);
    } else {
        showError(form, input, config);
    }
}

// Функция блокировки кнопки
function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.classList.remove('button');
        button.disabled = true;
    }
}

// Добавляем слушателей на инпутах и проверяем валидность
function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

// Включаем валидацию
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config);

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    });
}

// Объект с настройками
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(validationConfig)


