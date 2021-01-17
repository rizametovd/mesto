export class FormValidator {
    constructor(config, form) {
        this._formSelector = form;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    _showError(form, input) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        error.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }

    _hideError(form, input) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
    }

    _checkInputValidity(form, input) {
        if (input.validity.valid) {
            this._hideError(form, input);
        } else {
            this._showError(form, input);
        }
    }

    setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.classList.remove('button');
            button.disabled = true;
        }
    }


    _setEventListener(form) {
        const inputList = form.querySelectorAll(this._inputSelector);
        const submitButton = form.querySelector(this._submitButtonSelector);
        
        inputList.forEach(input => {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(form, input);
                this.setButtonState(submitButton, form.checkValidity());
            });
        });
    }

  
    enableValidation() {
        this._setEventListener(this._formSelector);
        this._formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })   
    }

}












