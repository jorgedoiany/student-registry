/**
 * StudentForm Component
 * Handles form rendering and validation
 */

import ValidationService from '../services/ValidationService.js';
import { showError, clearError, clearFormErrors } from '../utils/dom.js';

class StudentForm {
  constructor(formElement) {
    this.form = formElement;
    this.nameInput = formElement.querySelector('#name');
    this.ageInput = formElement.querySelector('#age');
    this.emailInput = formElement.querySelector('#email');
    this.editIdInput = formElement.querySelector('#edit-index');
    this.submitBtn = formElement.querySelector('button[type="submit"]');

    this.onSubmit = null;
    this.setupEventListeners();
  }

  /**
   * Setup form event listeners
   */
  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Real-time validation
    this.nameInput.addEventListener('blur', () => this.validateField('name'));
    this.ageInput.addEventListener('blur', () => this.validateField('age'));
    this.emailInput.addEventListener('blur', () => this.validateField('email'));

    // Clear errors on input
    [this.nameInput, this.ageInput, this.emailInput].forEach((input) => {
      input.addEventListener('input', () => clearError(input));
    });
  }

  /**
   * Set submit callback
   * @param {Function} callback - Submit callback function
   */
  setSubmitHandler(callback) {
    this.onSubmit = callback;
  }

  /**
   * Handle form submission
   */
  handleSubmit() {
    clearFormErrors(this.form);

    const formData = this.getFormData();
    const validation = ValidationService.validateStudent(formData);

    if (!validation.isValid) {
      this.displayErrors(validation.errors);
      return;
    }

    if (this.onSubmit) {
      const editId = this.editIdInput.value;
      const isEdit = editId && editId !== '-1';
      this.onSubmit(formData, isEdit ? Number(editId) : null);
    }
  }

  /**
   * Validate a single field
   * @param {string} fieldName - Field name to validate
   */
  validateField(fieldName) {
    const value = this[`${fieldName}Input`].value;
    let validation;

    switch (fieldName) {
      case 'name':
        validation = ValidationService.validateName(value);
        break;
      case 'age':
        validation = ValidationService.validateAge(value);
        break;
      case 'email':
        validation = ValidationService.validateEmail(value);
        break;
      default:
        return;
    }

    if (!validation.isValid) {
      showError(this[`${fieldName}Input`], validation.error);
    } else {
      clearError(this[`${fieldName}Input`]);
    }
  }

  /**
   * Get form data
   * @returns {Object} Form data object
   */
  getFormData() {
    return {
      name: this.nameInput.value,
      age: this.ageInput.value,
      email: this.emailInput.value,
    };
  }

  /**
   * Display validation errors
   * @param {Object} errors - Errors object
   */
  displayErrors(errors) {
    if (errors.name) {
      showError(this.nameInput, errors.name);
    }
    if (errors.age) {
      showError(this.ageInput, errors.age);
    }
    if (errors.email) {
      showError(this.emailInput, errors.email);
    }
  }

  /**
   * Reset form
   */
  reset() {
    this.form.reset();
    this.editIdInput.value = '-1';
    this.submitBtn.textContent = 'Add Record';
    clearFormErrors(this.form);
  }

  /**
   * Populate form with student data for editing
   * @param {Object} student - Student object
   */
  populate(student) {
    this.nameInput.value = student.name;
    this.ageInput.value = student.age;
    this.emailInput.value = student.email;
    this.editIdInput.value = student.id;
    this.submitBtn.textContent = 'Update Record';
    this.nameInput.focus();
  }

  /**
   * Check if form is in edit mode
   * @returns {boolean} Edit mode status
   */
  isEditMode() {
    return this.editIdInput.value !== '-1';
  }
}

export default StudentForm;
