// Fetch students from local storage
function getStudents() {
  return JSON.parse(localStorage.getItem('students')) || [];
}

// Save students to local storage
function saveStudents(students) {
  localStorage.setItem('students', JSON.stringify(students));
}

// Render students in the table
function renderStudents() {
  const students = getStudents();
  const tableBody = document.getElementById('studentTableBody');
  tableBody.innerHTML = '';

  students.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td class="border px-4 py-2">${student.name}</td>
          <td class="border px-4 py-2">${student.id}</td>
          <td class="border px-4 py-2">${student.email}</td>
          <td class="border px-4 py-2">${student.contact}</td>
          <td class="border px-4 py-2">
              <button class="bg-yellow-500 text-white rounded p-1 mr-2" onclick="editStudent(${index})">Edit</button>
              <button class="bg-red-500 text-white rounded p-1" onclick="deleteStudent(${index})">Delete</button>
          </td>
      `;
      tableBody.appendChild(row);
  });
}

// Validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Add student
document.getElementById('addButton').onclick = function() {
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('id').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (!name || !/^[a-zA-Z\s]+$/.test(name) || !id || !/^\d+$/.test(id) || !email || !isValidEmail(email) || !contact || !/^\d+$/.test(contact)) {
      alert('Please fill out all fields correctly, and ensure the email is valid.');
      return;
  }

  const students = getStudents();
  students.push({ name, id, email, contact });
  saveStudents(students);
  renderStudents();
  clearForm();
};

// Clear form fields
function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('id').value = '';
  document.getElementById('email').value = '';
  document.getElementById('contact').value = '';
}

// Edit student
function editStudent(index) {
  const students = getStudents();
  const student = students[index];

  document.getElementById('name').value = student.name;
  document.getElementById('id').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;

  // Remove the student and update the UI
  deleteStudent(index);
}

// Delete student
function deleteStudent(index) {
  const students = getStudents();
  students.splice(index, 1);
  saveStudents(students);
  renderStudents();
}

// Initial render
renderStudents();
