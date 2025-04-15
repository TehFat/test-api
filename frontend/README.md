# Prodcut Management System
This is a Simple Web application for management of Products 
## Prerequisists How to run
- NodeJS version 22.X

###  How to run Web Server
The webserver is ExpressJs running on NodeJS runtime engine. on the root folder of the repository run the following commands
- `npm install`
- `npm run dev`
  
If successfully run, you'll see the `MongoDB connected: <MongoDB Server url>` message.

###  How to run Frontend
From the root folder of the repository change into `frontend` folder and run the following commands in the provided sequence
- `npm install`
- `npm run dev`
    
## Technology Stack

### Frontend
- ReactJs
- Chkara UI
- Axios API Library

### Backend
- ExpressJS web server with NodeJs
- Mongoose Database Aaccess Library
- MongoDB
  

## Vulnerabilities Mitigated per Open Web Application Security Project (OWASP)

1. A03:2021 Injection
   This project is secured from SQL/code injection attacks using ExpressJs and MongoDB which prevents execution of SQL or other code on the Web Server and in the Database Engine.

2. A06:2021 Vulnerable and Outdated Components    
   All the frontend libraries and packages are latest and has no vulnerable or outdated dependecies. This can be confirmed by running the `npm audit` which return `found 0 vulnerabilites` message

### SEO and Accessibility

To ensure accessibility, I used semantic HTML and Chakra UI components that support keyboard navigation and screen readers. I added clear labels to all form inputs and used aria-required attributes to indicate mandatory fields. Color contrast was improved using high-contrast combinations for readability. 
For SEO, I used react-helmet to set the page title and meta description to help search engines understand the content of the page.

### Tracking
To track usage statictics Google Tag Manager is integrated in the Application which is tracking Page Load and Navigation at the moment. The tracking can be extended to track user actions like Button and Link clicks.  