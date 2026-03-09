/**
 * ValidationService
 * Handles form validation with comprehensive rules and error messages
 */

class ValidationService {
  /**
   * Validate student name
   * @param {string} name - Student name
   * @returns {Object} Validation result with isValid and error
   */
  static validateName(name) {
    if (!name || name.trim().length === 0) {
      return { isValid: false, error: 'Name is required' };
    }

    if (name.trim().length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters' };
    }

    if (name.trim().length > 100) {
      return { isValid: false, error: 'Name must be less than 100 characters' };
    }

    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(name.trim())) {
      return {
        isValid: false,
        error:
          'Name can only contain letters, spaces, hyphens, and apostrophes',
      };
    }

    return { isValid: true, error: null };
  }

  /**
   * Validate student age
   * @param {string|number} age - Student age
   * @returns {Object} Validation result with isValid and error
   */
  static validateAge(age) {
    if (age === '' || age === null || age === undefined) {
      return { isValid: false, error: 'Age is required' };
    }

    const ageNum = Number(age);

    if (isNaN(ageNum)) {
      return { isValid: false, error: 'Age must be a valid number' };
    }

    if (!Number.isInteger(ageNum)) {
      return { isValid: false, error: 'Age must be a whole number' };
    }

    if (ageNum < 1 || ageNum > 150) {
      return { isValid: false, error: 'Age must be between 1 and 150' };
    }

    return { isValid: true, error: null };
  }

  /**
   * Validate email address
   * @param {string} email - Email address
   * @returns {Object} Validation result with isValid and error
   */
  static validateEmail(email) {
    if (!email || email.trim().length === 0) {
      return { isValid: false, error: 'Email is required' };
    }

    // RFC 5322 compliant email regex (simplified)
    // Requires @ symbol and at least one dot in domain
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (!emailRegex.test(email.trim())) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }

    if (email.trim().length > 254) {
      return {
        isValid: false,
        error: 'Email must be less than 254 characters',
      };
    }

    return { isValid: true, error: null };
  }

  /**
   * Validate complete student form
   * @param {Object} student - Student object with name, age, email
   * @returns {Object} Validation result with isValid and errors object
   */
  static validateStudent(student) {
    const errors = {};
    let isValid = true;

    const nameValidation = this.validateName(student.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error;
      isValid = false;
    }

    const ageValidation = this.validateAge(student.age);
    if (!ageValidation.isValid) {
      errors.age = ageValidation.error;
      isValid = false;
    }

    const emailValidation = this.validateEmail(student.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
      isValid = false;
    }

    return { isValid, errors };
  }

  /**
   * Sanitize input string
   * @param {string} input - Input string
   * @returns {string} Sanitized string
   */
  static sanitize(input) {
    if (typeof input !== 'string') {
      return '';
    }
    return input.trim().replace(/[<>]/g, '');
  }
}

export default ValidationService;
