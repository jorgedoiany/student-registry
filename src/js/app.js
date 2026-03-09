/**
 * Application Main Controller
 * Orchestrates all components and services
 */

import StudentService from './services/StudentService.js';
import StudentForm from './components/StudentForm.js';
import StudentTable from './components/StudentTable.js';
import { toast } from './components/Toast.js';
import { modal } from './components/Modal.js';
import { getElementById, debounce } from './utils/dom.js';

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
    const searchInput = getElementById('search-input');

    this.form = new StudentForm(formElement);
    this.table = new StudentTable(tableBody);
    this.searchInput = searchInput;
    this.searchQuery = '';
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

    // Search handler with debounce
    const debouncedSearch = debounce((query) => {
      this.handleSearch(query);
    }, 300);

    this.searchInput.addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
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
  async handleDelete(studentId, studentName) {
    const confirmed = await modal.confirm({
      title: 'Delete Student',
      message: `Are you sure you want to delete ${studentName}? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
    });

    if (confirmed) {
      const result = this.studentService.deleteStudent(studentId);

      if (result.success) {
        this.form.reset();
        this.render();
        toast.success('Student deleted successfully');
      } else {
        toast.error('Error deleting student');
      }
    }
  }

  /**
   * Handle search input
   * @param {string} query - Search query
   */
  handleSearch(query) {
    this.searchQuery = query.trim();
    this.render();
  }

  /**
   * Render the application
   */
  render() {
    let students;

    if (this.searchQuery) {
      students = this.studentService.searchStudents(this.searchQuery);
    } else {
      students = this.studentService.getAllStudents();
    }

    this.table.render(students);
  }

  /**
   * Show notification message
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, warning, info)
   */
  showNotification(message, type = 'info') {
    toast[type](message);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

export default App;
