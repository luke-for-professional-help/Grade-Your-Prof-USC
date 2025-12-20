# Grade-Your-Prof-USC

Grade Your Prof USC is a web application that allows USC students to review their professors. The platform provides a centralized hub for sharing academic experiences, helping students make informed decisions about course selection.

##Tech Stack:

***Frontend:** SvelteKit, Svelte, Flowbite, Tailwind CSS

***Backend:** Node.js, SvelteKit Server Routes

***Database:** MySQL (with XAMPP or standalone)

***Language:** TypeScript, JavaScript

***Package Manager**: npm

##Folder structure

```
/Grade-Your-Prof-USC
├── /src
│   ├── /lib
│   │   ├── /assets          # Images, logos, SVG icons
│   │   ├── /components      # Reusable Svelte components
│   │   │   ├── /auth        # Login/Signup forms
│   │   │   ├── /forms       # Review and request forms
│   │   │   ├── /professor   # Professor-related components
│   │   │   └── /requestManagement # Request modal/card components
│   │   ├── /server          # Backend logic and database functions
│   │   │   ├── db.sql       # Database schema
│   │   │   └── dbconnect.js # Database connection and queries
│   │   └── /stores          # Svelte stores for state management
│   │       └── user.js      # User authentication state
│   ├── /routes              # SvelteKit routes and API endpoints
│   │   ├── /api            # REST API endpoints (CRUD operations)
│   │   ├── /auth           # Authentication pages
│   │   └── +page.svelte    # Home page
│   └── /app.html           # HTML entry point
├── /static                  # Static assets (favicons, etc.)
├── svelte.config.js        # Svelte configuration
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
├── .env                    # Environment variables (local)
└── README.md               # This file
```

Installation

**Prerequisites**

*Node.js (v16 or higher)

*npm (comes with Node.js)

*MySQL Server (XAMPP)

Steps:

1. Clone Repository
```
git clone https://github.com/yourusername/Grade-Your-Prof-USC.git
cd Grade-Your-Prof-USC/linear_TestBuild/linear-app
```

2. Install dependencies
```
npm install
```

3. Setup database
Start your MySQL server (XAMPP: Control Panel → Start MySQL)
Create the database:
```
mysql -u root -p
CREATE DATABASE gradeyourprof;
EXIT
```

Import the schema:
```
mysql -u root -p gradeyourprof < src/lib/server/db.sql
```


4. Run local dev
```
npm run dev

o+enter (after server has been run)
```

##Usage

*Authentication
-Signup
-Login
-Logout

*Submitting a Review:
1. Log in to your account
2. Navigate to "Write a Review"
3. Select a professor and subject
4. Write your review and submit
5. Wait for moderator approval

*Browsing Reviews
1. Visit the home page to see approved professor reviews
2. Search by professor name
3. Open professor profile
4. View the user made review

*Admin/Moderator Functions
1. Approve/reject pending reviews
2. Manage professor and subject databases
3. Handle user role assignments

##Contact & Support
For questions or issues, please open a GitHub issue or contact the development team.
