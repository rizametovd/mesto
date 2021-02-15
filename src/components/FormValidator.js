export default class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._submitButton = form.querySelector(config.submitButtonSelector);
    }

    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        error.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
    }

    clearSpanError() {
        const errorSpan = this._form.querySelectorAll(`.${this._errorClass}`);
        errorSpan.forEach(span => span.textContent = '');
    }

    clearTypeError() {
        const errorType = this._form.querySelectorAll(`.${this._inputErrorClass}`);
        errorType.forEach(type => type.classList.remove(this._inputErrorClass));
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }

    setButtonState(isActive) {
        if (isActive) {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.classList.remove('button');
            this._submitButton.disabled = true;
        }
    }


    _setEventListener(form) {
        const inputList = form.querySelectorAll(this._inputSelector);

        inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.setButtonState(form.checkValidity());
            });
        });
    }


    enableValidation() {
        this._setEventListener(this._form);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }

}












