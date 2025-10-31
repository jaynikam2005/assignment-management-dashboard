# Assignment & Review Dashboard

A clean, responsive student assignment management system built with React and Tailwind CSS. This application provides role-based functionality for both students and administrators (professors) to manage assignments, track submissions, and monitor progress.

## 🚀 Features

### Student Features
- **View Assignments**: See all assigned assignments with details and due dates
- **Track Progress**: Visual progress bars for assignment completion status
- **Double-Verification Submission**: Two-step confirmation flow for submitting assignments
- **Drive Link Access**: Direct access to Google Drive submission folders
- **Filter Assignments**: View by all, pending, or submitted assignments
- **Status Tracking**: Clear visual indicators for submission status and days remaining

### Admin Features
- **Create Assignments**: Easy form to create new assignments with title, description, due date, and Drive link
- **Manage Assignments**: View all created assignments with edit/delete capabilities
- **Track Submissions**: See submission status for each student with individual progress bars
- **Submission Analytics**: Overall submission rate and per-student status visualization
- **Filter by Status**: View all, pending, or fully completed assignments
- **Student Overview**: Quick stats showing total students and submission progress

## 📋 Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.js                 # Navigation bar with user info
│   │   │   ├── LoginPage.js              # Role-based login interface
│   │   │   └── ProgressBar.js            # Reusable progress indicator
│   │   ├── student/
│   │   │   ├── StudentDashboard.js       # Main student view
│   │   │   └── AssignmentCard.js         # Assignment display & submission modal
│   │   └── admin/
│   │       ├── AdminDashboard.js         # Main admin view
│   │       ├── CreateAssignmentModal.js  # Create assignment form
│   │       └── AssignmentManagementCard.js # Assignment management display
│   ├── contexts/
│   │   └── AuthContext.js                # Authentication & user state management
│   ├── data/
│   │   └── mockData.js                   # Mock data & localStorage management
│   ├── utils/
│   ├── App.js                            # Main application component
│   ├── App.css                           # Application styles
│   └── index.css                         # Tailwind directives
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🏗️ Architecture Overview

### Component Hierarchy
```
App (AuthProvider)
├── AppContent
│   ├── LoginPage (when not authenticated)
│   └── [Authenticated]
│       ├── Navbar
│       ├── StudentDashboard
│       │   ├── AssignmentCard (multiple)
│       │   └── SubmissionModal
│       └── AdminDashboard
│           ├── AssignmentManagementCard (multiple)
│           └── CreateAssignmentModal
```

### State Management
- **AuthContext**: Manages current user, login/logout, and role-based access
- **Local Component State**: useState for form inputs, filters, and modal visibility
- **LocalStorage**: Persists user sessions, assignments, and submission data

### Data Flow
1. **Initialization**: MockData initializes localStorage with sample data on first load
2. **User Login**: AuthContext verifies user and sets currentUser
3. **Data Loading**: Components load relevant data based on user role
4. **Updates**: Changes are saved to localStorage and UI updates via React state

## 🛠️ Tech Stack

- **Frontend Framework**: React.js (v18+)
- **Styling**: Tailwind CSS 4+
- **State Management**: React Context API
- **CSS Framework**: Tailwind CSS with PostCSS
- **Build Tool**: Create React App

## 📦 Installation & Setup

### Prerequisites
- Node.js 14+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/jaynikam2005/joineazy-dashboard.git
   cd joineazy-dashboard/dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Authentication

The app includes a mock authentication system for testing:

### Demo Credentials

**Students:**
- Alice Johnson
- Bob Smith
- Carol White

**Professors:**
- Prof. David Lee

Simply select your role and user from the login page. No password required for demo purposes.

## 💾 Data Persistence

All data is stored in browser localStorage:
- `students`: Student user profiles
- `admins`: Admin user profiles
- `assignments`: All assignments and submission tracking
- `currentUser`: Current logged-in user session

Data persists across browser sessions until manually cleared.

## 🎨 Design Decisions

### UI/UX
1. **Color Scheme**: Blue gradient primary colors with green for success, red for pending
2. **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
3. **Component Reusability**: ProgressBar and common components shared across views
4. **Clear Visual Hierarchy**: Cards, stats, and filters with consistent spacing

### Functionality
1. **Double-Verification**: Two-step submission prevents accidental submits
2. **Progress Tracking**: Visual indicators help both students and teachers understand status
3. **Drive Link Integration**: Direct access to submission folders
4. **Filter System**: Helps users focus on relevant assignments
5. **Real-time Updates**: LocalStorage ensures consistency across sessions

### Code Organization
1. **Component-Based**: Modular components for maintainability
2. **Context API**: Centralized authentication state
3. **Separation of Concerns**: Data logic in utils, UI in components
4. **Reusable Utilities**: Mock data functions for consistent data handling

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy!

### Vercel Deployment
1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Create React App settings
4. Deploy with one click!

## 🧪 Features Demo

### Student Flow
1. Login as a student
2. View all assignments with due dates
3. Click "Mark as Submitted" to confirm submission
4. Confirm in the double-verification modal
5. Watch submission status update in real-time

### Admin Flow
1. Login as a professor
2. View dashboard with submission analytics
3. Create new assignment with Google Drive link
4. Monitor student submissions with progress bars
5. Filter by submission status

## 📱 Responsive Design

The dashboard is fully responsive across:
- **Mobile**: 320px+ (single column layout, touch-friendly buttons)
- **Tablet**: 768px+ (two-column cards, optimized spacing)
- **Desktop**: 1024px+ (full grid layout with maximum 7xl width)

## 🔒 Data Privacy

- Each user sees only their own data (students) or assigned students (admins)
- No backend server required - all data is local to browser
- Perfect for demo/testing purposes

## 📚 API Documentation

### Mock Data Functions

```javascript
// Get assignments assigned to a student
getStudentAssignments(studentId) → Assignment[]

// Get assignments created by an admin
getAssignmentsByAdmin(adminId) → Assignment[]

// Update submission status
updateSubmissionStatus(assignmentId, studentId, submitted) → void

// Create new assignment
createAssignment(adminId, assignmentData) → Assignment

// Save all assignments
saveAssignments(assignments) → void
```

## 🐛 Known Limitations

- No actual file upload (uses Drive links instead)
- No email notifications
- No assignment grading system
- Single-session authentication (no persistent login across tabs)

## 🎯 Future Enhancements

- Real file upload system
- Grade assignment feature
- Email notifications
- Comments/feedback system
- Assignment groups/categories
- Advanced analytics/charts

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Developer Notes

### Component Design Patterns
- Functional components with hooks throughout
- Custom hooks for data fetching logic
- Props drilling minimized with Context API
- Tailwind utility classes for styling

### Performance Considerations
- useCallback for dependency arrays in effects
- Filter operations memoized at component level
- Avoid inline object/array creation in render

### Testing
To test locally:
```bash
npm test
```

## 🤝 Support

For questions or issues, refer to the GitHub repository or contact the development team.

---

**Last Updated**: November 1, 2025
**Version**: 1.0.0
