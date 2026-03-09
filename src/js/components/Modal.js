/**
 * Modal Component
 * Provides professional modal dialogs for confirmations and alerts
 */

export class Modal {
  constructor() {
    this.modal = null;
    this.resolveCallback = null;
  }

  /**
   * Shows a confirmation modal
   * @param {Object} options - Modal options
   * @param {string} options.title - Modal title
   * @param {string} options.message - Modal message
   * @param {string} options.confirmText - Confirm button text
   * @param {string} options.cancelText - Cancel button text
   * @param {string} options.type - Modal type: 'danger', 'warning', 'info'
   * @returns {Promise<boolean>} True if confirmed, false if cancelled
   */
  confirm({
    title = 'Confirm',
    message = 'Are you sure?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger',
  } = {}) {
    return new Promise((resolve) => {
      this.resolveCallback = resolve;
      this.show(title, message, confirmText, cancelText, type);
    });
  }

  /**
   * Creates and shows the modal
   * @private
   */
  show(title, message, confirmText, cancelText, type) {
    // Remove existing modal if any
    this.destroy();

    // Create modal structure
    this.modal = document.createElement('div');
    this.modal.className = 'modal-overlay';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', 'modal-title');
    this.modal.setAttribute('aria-describedby', 'modal-message');

    this.modal.innerHTML = `
      <div class="modal-dialog modal-dialog--${type}">
        <div class="modal-header">
          <h3 id="modal-title" class="modal-title">${this.escapeHtml(title)}</h3>
          <button class="modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          <p id="modal-message" class="modal-message">${this.escapeHtml(message)}</p>
        </div>
        <div class="modal-footer">
          <button class="modal-button modal-button--cancel">${this.escapeHtml(cancelText)}</button>
          <button class="modal-button modal-button--confirm modal-button--${type}">${this.escapeHtml(confirmText)}</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);

    // Setup event listeners
    this.setupEventListeners();

    // Focus confirm button
    requestAnimationFrame(() => {
      this.modal.classList.add('modal-overlay--show');
      const confirmButton = this.modal.querySelector('.modal-button--confirm');
      if (confirmButton) {
        confirmButton.focus();
      }
    });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  /**
   * Setup modal event listeners
   * @private
   */
  setupEventListeners() {
    const confirmButton = this.modal.querySelector('.modal-button--confirm');
    const cancelButton = this.modal.querySelector('.modal-button--cancel');
    const closeButton = this.modal.querySelector('.modal-close');

    confirmButton.addEventListener('click', () => this.handleConfirm());
    cancelButton.addEventListener('click', () => this.handleCancel());
    closeButton.addEventListener('click', () => this.handleCancel());

    // Close on overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.handleCancel();
      }
    });

    // Close on ESC key
    this.escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.handleCancel();
      }
    };
    document.addEventListener('keydown', this.escapeHandler);
  }

  /**
   * Handle confirm action
   * @private
   */
  handleConfirm() {
    if (this.resolveCallback) {
      this.resolveCallback(true);
    }
    this.destroy();
  }

  /**
   * Handle cancel action
   * @private
   */
  handleCancel() {
    if (this.resolveCallback) {
      this.resolveCallback(false);
    }
    this.destroy();
  }

  /**
   * Destroy the modal
   * @private
   */
  destroy() {
    if (this.modal) {
      this.modal.classList.remove('modal-overlay--show');

      setTimeout(() => {
        if (this.modal && this.modal.parentElement) {
          this.modal.remove();
        }
        this.modal = null;
        document.body.style.overflow = '';
      }, 200);
    }

    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }

    this.resolveCallback = null;
  }

  /**
   * Escapes HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   * @private
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Export singleton instance
export const modal = new Modal();
