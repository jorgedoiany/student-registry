/**
 * DOM Utilities
 * Helper functions for DOM manipulation
 */

/**
 * Get element by ID with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement} DOM element
 * @throws {Error} If element not found
 */
export function getElementById(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" not found`);
  }
  return element;
}

/**
 * Create element with attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string|HTMLElement} content - Element content
 * @returns {HTMLElement} Created element
 */
export function createElement(tag, attributes = {}, content = '') {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });

  if (typeof content === 'string') {
    element.textContent = content;
  } else if (content instanceof HTMLElement) {
    element.appendChild(content);
  }

  return element;
}

/**
 * Clear all children from an element
 * @param {HTMLElement} element - Parent element
 */
export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Show validation error message
 * @param {HTMLElement} inputElement - Input element
 * @param {string} message - Error message
 */
export function showError(inputElement, message) {
  inputElement.classList.add('error');

  // Remove existing error message
  const existingError =
    inputElement.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Create and append error message
  const errorElement = createElement(
    'span',
    { className: 'error-message' },
    message
  );
  inputElement.parentElement.appendChild(errorElement);
}

/**
 * Clear validation error
 * @param {HTMLElement} inputElement - Input element
 */
export function clearError(inputElement) {
  inputElement.classList.remove('error');
  const errorMessage =
    inputElement.parentElement.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

/**
 * Clear all form errors
 * @param {HTMLFormElement} form - Form element
 */
export function clearFormErrors(form) {
  const inputs = form.querySelectorAll('input');
  inputs.forEach(clearError);
}
