/**
 * StudentService
 * Business logic for student management operations
 */

import StorageService from './StorageService.js';
import ValidationService from './ValidationService.js';

class StudentService {
  constructor() {
    this.students = [];
    this.loadStudents();
  }

  /**
   * Load students from storage
   */
  loadStudents() {
    const storedStudents = StorageService.load();
    this.students =
      storedStudents.length > 0 ? storedStudents : this.getDefaultStudents();

    // Save default students if none exist
    if (storedStudents.length === 0 && this.students.length > 0) {
      this.saveStudents();
    }
  }

  /**
   * Get default students for initial data
   * @returns {Array} Default student records
   */
  getDefaultStudents() {
    return [
      { id: 1, name: 'John Doe', age: 20, email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', age: 22, email: 'jane.smith@example.com' },
      {
        id: 3,
        name: 'Emily Johnson',
        age: 19,
        email: 'emily.johnson@example.com',
      },
    ];
  }

  /**
   * Save students to storage
   */
  saveStudents() {
    StorageService.save(this.students);
  }

  /**
   * Get all students
   * @returns {Array} Array of student objects
   */
  getAllStudents() {
    return [...this.students];
  }

  /**
   * Add a new student
   * @param {Object} studentData - Student data (name, age, email)
   * @returns {Object} Result with success status and student or errors
   */
  addStudent(studentData) {
    const validation = ValidationService.validateStudent(studentData);

    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const newStudent = {
      id: this.generateId(),
      name: ValidationService.sanitize(studentData.name),
      age: Number(studentData.age),
      email: ValidationService.sanitize(studentData.email).toLowerCase(),
    };

    this.students.push(newStudent);
    this.saveStudents();

    return { success: true, student: newStudent };
  }

  /**
   * Update an existing student
   * @param {number} id - Student ID
   * @param {Object} studentData - Updated student data
   * @returns {Object} Result with success status and student or errors
   */
  updateStudent(id, studentData) {
    const validation = ValidationService.validateStudent(studentData);

    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const index = this.students.findIndex((s) => s.id === id);

    if (index === -1) {
      return { success: false, errors: { general: 'Student not found' } };
    }

    this.students[index] = {
      id,
      name: ValidationService.sanitize(studentData.name),
      age: Number(studentData.age),
      email: ValidationService.sanitize(studentData.email).toLowerCase(),
    };

    this.saveStudents();

    return { success: true, student: this.students[index] };
  }

  /**
   * Delete a student
   * @param {number} id - Student ID
   * @returns {Object} Result with success status
   */
  deleteStudent(id) {
    const index = this.students.findIndex((s) => s.id === id);

    if (index === -1) {
      return { success: false, error: 'Student not found' };
    }

    this.students.splice(index, 1);
    this.saveStudents();

    return { success: true };
  }

  /**
   * Get a student by ID
   * @param {number} id - Student ID
   * @returns {Object|null} Student object or null
   */
  getStudentById(id) {
    return this.students.find((s) => s.id === id) || null;
  }

  /**
   * Generate unique ID for new student
   * @returns {number} Unique ID
   */
  generateId() {
    return this.students.length > 0
      ? Math.max(...this.students.map((s) => s.id)) + 1
      : 1;
  }

  /**
   * Clear all students
   * @returns {boolean} Success status
   */
  clearAll() {
    this.students = [];
    return StorageService.clear();
  }

  /**
   * Search students by name or email
   * @param {string} query - Search query
   * @returns {Array} Filtered students
   */
  searchStudents(query) {
    if (!query || query.trim().length === 0) {
      return this.getAllStudents();
    }

    const lowerQuery = query.toLowerCase().trim();
    return this.students.filter(
      (student) =>
        student.name.toLowerCase().includes(lowerQuery) ||
        student.email.toLowerCase().includes(lowerQuery)
    );
  }
}

export default StudentService;
