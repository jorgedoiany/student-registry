/**
 * Loading Spinner Component
 * Provides visual feedback during async operations
 */

export class LoadingSpinner {
  /**
   * Creates a loading spinner element
   * @param {Object} options - Spinner options
   * @param {string} options.size - Spinner size: 'small', 'medium', 'large'
   * @param {string} options.text - Loading text to display
   * @returns {HTMLElement} Spinner element
   */
  static create({ size = 'medium', text = 'Loading...' } = {}) {
    const spinner = document.createElement('div');
    spinner.className = `spinner spinner--${size}`;
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-live', 'polite');

    spinner.innerHTML = `
      <div class="spinner__circle"></div>
      ${text ? `<span class="spinner__text">${this.escapeHtml(text)}</span>` : ''}
      <span class="visually-hidden">${this.escapeHtml(text)}</span>
    `;

    return spinner;
  }

  /**
   * Shows a loading overlay
   * @param {HTMLElement} container - Container element
   * @param {string} text - Loading text
   * @returns {HTMLElement} Overlay element
   */
  static showOverlay(container, text = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';

    const spinner = this.create({ size: 'large', text });
    overlay.appendChild(spinner);

    container.style.position = 'relative';
    container.appendChild(overlay);

    return overlay;
  }

  /**
   * Removes loading overlay
   * @param {HTMLElement} overlay - Overlay element to remove
   */
  static hideOverlay(overlay) {
    if (overlay && overlay.parentElement) {
      overlay.remove();
    }
  }

  /**
   * Shows inline spinner in an element
   * @param {HTMLElement} element - Target element
   * @param {string} text - Loading text
   * @returns {HTMLElement} Spinner element
   */
  static showInline(element, text = '') {
    const spinner = this.create({ size: 'small', text });
    element.innerHTML = '';
    element.appendChild(spinner);
    return spinner;
  }

  /**
   * Escapes HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   * @private
   */
  static escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Export convenience methods
export const showLoading = LoadingSpinner.showOverlay;
export const hideLoading = LoadingSpinner.hideOverlay;
