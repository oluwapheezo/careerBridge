# CareerBridge

### Your Next Opportunity Starts Here

CareerBridge is a responsive recruitment platform designed to connect job seekers with employment opportunities. It allows users to explore featured jobs, view job details, and submit applications with CV attachments.

The project also includes an admin dashboard for managing candidate applications.

## Features

- Responsive homepage for desktop, tablet, and mobile.
- Job search by keyword and location.
- Featured job listings.
- Job details modal.
- Application form with CV upload.
- Netlify Forms integration for receiving applications.
- Admin dashboard for managing candidate records.
- Add, view, edit, and delete candidates.
- Search and filter applications by status.
- Update candidate application status.
- CV preview and download for supported files.
- Export candidate records to CSV.

## Technologies Used

- HTML5 – Website structure.
- CSS3 – Styling and responsive layouts.
- JavaScript (Vanilla) – Interactive features and application management.
- Netlify – Website hosting and form submissions.
- Git and GitHub – Version control and project management.

## Live Demo

Visit the live CareerBridge website:

https://careerbridgeproject.netlify.app/

Admin Dashboard Demo:

https://careerbridgeproject.netlify.app/admin.html

## Project Structure

careerbridge/
│
├── index.html
├── admin.html
├── README.md
│
├── css/
│   ├── style.css
│   └── admin.css
│
├── js/
│   ├── script.js
│   └── admin.js
│
└── images/

## Getting Started

To run CareerBridge locally:

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in your browser.
4. Open `admin.html` to view the admin dashboard.

No additional packages or build tools are required.

## Current Limitations

- The admin dashboard is a frontend demonstration.
- Candidate records are stored in browser localStorage.
- Admin authentication and role-based access are not implemented.
- Netlify Forms submissions are managed separately from the dashboard's localStorage records.
- A secure backend and database are required for production use.

## Future Improvements

- Build a secure backend API.
- Integrate a database for permanent candidate records.
- Implement administrator authentication.
- Connect live applications directly to the admin dashboard.
- Add advanced recruitment and candidate management features.