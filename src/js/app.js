/**
 * Application Main Controller
 * Orchestrates all components and services
 */

import StudentService from './services/StudentService.js';
import StudentForm from './components/StudentForm.js';
import StudentTable from './components/StudentTable.js';
import { getElementById } from './utils/dom.js';

class App {
  constructor() {
    this.studentService = new StudentService();
    this.initializeComponents();
    this.setupEventHandlers();
    this.render();
  }

  /**
   * Initialize UI components
   */
  initializeComponents() {
    const formElement = getElementById('record-form');
    const tableBody = getElementById('record-list');

    this.form = new StudentForm(formElement);
    this.table = new StudentTable(tableBody);
  }

  /**
   * Setup event handlers
   */
  setupEventHandlers() {
    // Form submit handler
    this.form.setSubmitHandler((formData, editId) => {
      this.handleFormSubmit(formData, editId);
    });

    // Table edit handler
    this.table.setEditHandler((studentId) => {
      this.handleEdit(studentId);
    });

    // Table delete handler
    this.table.setDeleteHandler((studentId, studentName) => {
      this.handleDelete(studentId, studentName);
    });
  }

  /**
   * Handle form submission (add or update student)
   * @param {Object} formData - Form data
   * @param {number|null} editId - Student ID if editing
   */
  handleFormSubmit(formData, editId) {
    let result;

    if (editId) {
      result = this.studentService.updateStudent(editId, formData);
    } else {
      result = this.studentService.addStudent(formData);
    }

    if (result.success) {
      this.form.reset();
      this.render();

      // Highlight the updated/added row
      if (result.student) {
        this.table.highlightRow(result.student.id);
      }

      this.showNotification(
        editId ? 'Student updated successfully' : 'Student added successfully',
        'success'
      );
    } else {
      this.form.displayErrors(result.errors);
    }
  }

  /**
   * Handle edit button click
   * @param {number} studentId - Student ID
   */
  handleEdit(studentId) {
    const student = this.studentService.getStudentById(studentId);
    if (student) {
      this.form.populate(student);

      // Scroll to form
      document.querySelector('.left').scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Handle delete button click
   * @param {number} studentId - Student ID
   * @param {string} studentName - Student name for confirmation
   */
  handleDelete(studentId, studentName) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${studentName}?`
    );

    if (confirmed) {
      const result = this.studentService.deleteStudent(studentId);

      if (result.success) {
        this.form.reset();
        this.render();
        this.showNotification('Student deleted successfully', 'success');
      } else {
        this.showNotification('Error deleting student', 'error');
      }
    }
  }

  /**
   * Render the application
   */
  render() {
    const students = this.studentService.getAllStudents();
    this.table.render(students);
  }

  /**
   * Show notification message
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, info)
   */
  showNotification(message, type = 'info') {
    // Simple console notification for now
    // TODO: Implement proper toast/notification UI
    if (type === 'error') {
      console.error(message);
    } else {
      console.warn(message);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

export default App;
