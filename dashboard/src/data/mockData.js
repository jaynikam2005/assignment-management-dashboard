// Mock data for students and assignments
const mockStudents = [
  { id: 's1', name: 'Alice Johnson', email: 'alice@example.com', role: 'student' },
  { id: 's2', name: 'Bob Smith', email: 'bob@example.com', role: 'student' },
  { id: 's3', name: 'Carol White', email: 'carol@example.com', role: 'student' },
];

const mockAdmins = [
  { id: 'a1', name: 'Prof. David Lee', email: 'david@example.com', role: 'admin' },
];

const mockAssignments = [
  {
    id: 'assign1',
    title: 'React Basics',
    description: 'Build a simple React component with hooks',
    dueDate: '2025-11-05',
    driveLink: 'https://drive.google.com/folder/1',
    createdBy: 'a1',
    createdAt: '2025-10-28',
    submissions: [
      { studentId: 's1', submitted: true, submittedAt: '2025-10-31' },
      { studentId: 's2', submitted: false },
      { studentId: 's3', submitted: true, submittedAt: '2025-10-30' },
    ],
  },
  {
    id: 'assign2',
    title: 'Tailwind CSS Project',
    description: 'Create a responsive dashboard using Tailwind CSS',
    dueDate: '2025-11-10',
    driveLink: 'https://drive.google.com/folder/2',
    createdBy: 'a1',
    createdAt: '2025-10-25',
    submissions: [
      { studentId: 's1', submitted: false },
      { studentId: 's2', submitted: true, submittedAt: '2025-10-29' },
      { studentId: 's3', submitted: false },
    ],
  },
  {
    id: 'assign3',
    title: 'JavaScript Advanced Concepts',
    description: 'Implement closures, async/await, and promises',
    dueDate: '2025-11-15',
    driveLink: 'https://drive.google.com/folder/3',
    createdBy: 'a1',
    createdAt: '2025-10-20',
    submissions: [
      { studentId: 's1', submitted: true, submittedAt: '2025-10-28' },
      { studentId: 's2', submitted: true, submittedAt: '2025-10-27' },
      { studentId: 's3', submitted: true, submittedAt: '2025-10-26' },
    ],
  },
];

// Initialize localStorage with mock data
export const initializeMockData = () => {
  if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify(mockStudents));
  }
  if (!localStorage.getItem('admins')) {
    localStorage.setItem('admins', JSON.stringify(mockAdmins));
  }
  if (!localStorage.getItem('assignments')) {
    localStorage.setItem('assignments', JSON.stringify(mockAssignments));
  }
};

export const getStudents = () => {
  const data = localStorage.getItem('students');
  return data ? JSON.parse(data) : mockStudents;
};

export const getAdmins = () => {
  const data = localStorage.getItem('admins');
  return data ? JSON.parse(data) : mockAdmins;
};

export const getAssignments = () => {
  const data = localStorage.getItem('assignments');
  return data ? JSON.parse(data) : mockAssignments;
};

export const getAssignmentsByAdmin = (adminId) => {
  return getAssignments().filter(assignment => assignment.createdBy === adminId);
};

export const getStudentAssignments = (studentId) => {
  return getAssignments().filter(assignment => 
    assignment.submissions.some(sub => sub.studentId === studentId)
  );
};

export const saveAssignments = (assignments) => {
  localStorage.setItem('assignments', JSON.stringify(assignments));
};

export const createAssignment = (adminId, assignment) => {
  const assignments = getAssignments();
  const newAssignment = {
    ...assignment,
    id: `assign${Date.now()}`,
    createdBy: adminId,
    createdAt: new Date().toISOString().split('T')[0],
    submissions: getStudents().map(student => ({
      studentId: student.id,
      submitted: false,
    })),
  };
  assignments.push(newAssignment);
  saveAssignments(assignments);
  return newAssignment;
};

export const updateSubmissionStatus = (assignmentId, studentId, submitted) => {
  const assignments = getAssignments();
  const assignment = assignments.find(a => a.id === assignmentId);
  if (assignment) {
    const submission = assignment.submissions.find(s => s.studentId === studentId);
    if (submission) {
      submission.submitted = submitted;
      if (submitted) {
        submission.submittedAt = new Date().toISOString().split('T')[0];
      }
    }
    saveAssignments(assignments);
  }
};
