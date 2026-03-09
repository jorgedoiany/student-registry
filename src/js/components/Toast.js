/**
 * Toast Notification System
 * Provides professional, non-blocking notifications to users
 */

export class Toast {
  constructor() {
    this.container = this.createContainer();
    document.body.appendChild(this.container);
    this.activeToasts = new Set();
  }

  /**
   * Creates the toast container element
   * @returns {HTMLElement} Toast container
   */
  createContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    return container;
  }

  /**
   * Shows a toast notification
   * @param {string} message - The message to display
   * @param {string} type - Type of toast: 'success', 'error', 'warning', 'info'
   * @param {number} duration - Duration in milliseconds (0 = persistent)
   */
  show(message, type = 'info', duration = 3000) {
    const toast = this.createToast(message, type);
    this.container.appendChild(toast);
    this.activeToasts.add(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('toast--show');
    });

    // Auto-dismiss if duration > 0
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }

    return toast;
  }

  /**
   * Creates a toast element
   * @param {string} message - The message
   * @param {string} type - Toast type
   * @returns {HTMLElement} Toast element
   */
  createToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');

    const icon = this.getIcon(type);
    const closeButton = this.createCloseButton(toast);

    toast.innerHTML = `
      <span class="toast__icon">${icon}</span>
      <span class="toast__message">${this.escapeHtml(message)}</span>
    `;
    toast.appendChild(closeButton);

    return toast;
  }

  /**
   * Creates a close button for toast
   * @param {HTMLElement} toast - Toast element
   * @returns {HTMLElement} Close button
   */
  createCloseButton(toast) {
    const button = document.createElement('button');
    button.className = 'toast__close';
    button.setAttribute('aria-label', 'Close notification');
    button.innerHTML = '&times;';
    button.addEventListener('click', () => this.dismiss(toast));
    return button;
  }

  /**
   * Dismisses a toast notification
   * @param {HTMLElement} toast - Toast to dismiss
   */
  dismiss(toast) {
    if (!this.activeToasts.has(toast)) return;

    toast.classList.remove('toast--show');
    toast.classList.add('toast--hide');

    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
      this.activeToasts.delete(toast);
    }, 300);
  }

  /**
   * Dismisses all active toasts
   */
  dismissAll() {
    this.activeToasts.forEach((toast) => this.dismiss(toast));
  }

  /**
   * Gets icon for toast type
   * @param {string} type - Toast type
   * @returns {string} Icon HTML
   */
  getIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[type] || icons.info;
  }

  /**
   * Escapes HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Convenience methods
  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 4000) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration = 3500) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  }
}

// Export singleton instance
export const toast = new Toast();
