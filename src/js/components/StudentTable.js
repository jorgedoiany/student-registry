/**
 * StudentTable Component
 * Handles rendering and management of the student table
 */

import { createElement, clearElement } from '../utils/dom.js';

class StudentTable {
  constructor(tableBodyElement) {
    this.tbody = tableBodyElement;
    this.onEdit = null;
    this.onDelete = null;
  }

  /**
   * Set edit callback
   * @param {Function} callback - Edit callback function
   */
  setEditHandler(callback) {
    this.onEdit = callback;
  }

  /**
   * Set delete callback
   * @param {Function} callback - Delete callback function
   */
  setDeleteHandler(callback) {
    this.onDelete = callback;
  }

  /**
   * Render students in the table
   * @param {Array} students - Array of student objects
   */
  render(students) {
    clearElement(this.tbody);

    if (students.length === 0) {
      this.renderEmptyState();
      return;
    }

    students.forEach((student) => {
      const row = this.createStudentRow(student);
      this.tbody.appendChild(row);
    });
  }

  /**
   * Render empty state message
   */
  renderEmptyState() {
    const tr = createElement('tr');
    const td = createElement(
      'td',
      { colspan: '5', className: 'empty-state' },
      'No students registered yet. Add your first student above.'
    );
    tr.appendChild(td);
    this.tbody.appendChild(tr);
  }

  /**
   * Create a table row for a student
   * @param {Object} student - Student object
   * @returns {HTMLElement} Table row element
   */
  createStudentRow(student) {
    const tr = createElement('tr', { dataset: { studentId: student.id } });

    // Name cell
    const nameTd = createElement('td', {}, student.name);
    tr.appendChild(nameTd);

    // Age cell
    const ageTd = createElement('td', {}, String(student.age));
    tr.appendChild(ageTd);

    // Email cell
    const emailTd = createElement('td', {}, student.email);
    tr.appendChild(emailTd);

    // Edit button cell
    const editTd = createElement('td');
    const editBtn = createElement(
      'button',
      { className: 'editButton', 'aria-label': `Edit ${student.name}` },
      'Edit'
    );
    editBtn.addEventListener('click', () => {
      if (this.onEdit) {
        this.onEdit(student.id);
      }
    });
    editTd.appendChild(editBtn);
    tr.appendChild(editTd);

    // Delete button cell
    const deleteTd = createElement('td');
    const deleteBtn = createElement(
      'button',
      { className: 'deleteButton', 'aria-label': `Delete ${student.name}` },
      'Delete'
    );
    deleteBtn.addEventListener('click', () => {
      if (this.onDelete) {
        this.onDelete(student.id, student.name);
      }
    });
    deleteTd.appendChild(deleteBtn);
    tr.appendChild(deleteTd);

    return tr;
  }

  /**
   * Highlight a specific row temporarily
   * @param {number} studentId - Student ID
   */
  highlightRow(studentId) {
    const row = this.tbody.querySelector(`tr[data-student-id="${studentId}"]`);
    if (row) {
      row.classList.add('highlight');
      setTimeout(() => {
        row.classList.remove('highlight');
      }, 1000);
    }
  }
}

export default StudentTable;
