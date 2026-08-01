# **Company Project 2: Project Management Dashboard**

## **Project Overview**

Build a **frontend-only project management dashboard** using React and TypeScript.

The application should allow users to view projects, manage tasks, track progress, and monitor deadlines through a responsive and user-friendly interface.

No backend, database, authentication, or custom API is required. Data may come from an existing API, mock API, or provided data source.

---

## **Core Features**

### **Dashboard**

Display:

* Total projects  
* Active projects  
* Completed projects  
* Total tasks  
* Completed tasks  
* Overdue tasks  
* Upcoming deadlines  
* Project progress

### **Projects**

Users should be able to:

* View all projects  
* Search projects  
* Filter projects by status  
* View project details

### **Project Details**

Display:

* Project information  
* Progress  
* Tasks  
* Team members  
* Deadlines  
* Recent activity

### **Task Management**

Users should be able to:

* View tasks  
* Create tasks using a controlled form  
* Update task status  
* Set task priorities  
* Assign tasks to team members  
* View task details

Suggested statuses:

```
To Do → In Progress → In Review → Completed
```

---

## **Required Technical Features**

The application must demonstrate:

* React functional components  
* TypeScript interfaces and typed props  
* Typed function arguments and events  
* Tailwind CSS  
* Responsive design  
* React Router with multiple pages  
* API or mock data fetching  
* Loading, error, and empty states  
* Controlled forms with validation  
* `useState`  
* `useEffect`  
* `useContext` for global state  
* At least one custom hook  
* Practical use of `useRef`  
* Lazy loading of at least one page or component

---

## **Suggested Routes**

```
/
/dashboard
/projects
/projects/:id
/tasks/:id
```

---

## **Frontend State**

Since this is a frontend-only project, new or updated data may be managed using:

* React state  
* Context API  
* LocalStorage

---

## **Deliverables**

Each team must submit:

* A working React \+ TypeScript application  
* A GitHub repository  
* A deployed application on Vercel  
* A README containing:  
  * Project overview  
  * Features  
  * Technologies used  
  * Setup instructions  
  * Data source information

---

## **Definition of Done**

The project is complete when:

* The application is built with React and TypeScript  
* The application is responsive  
* Multiple pages and routes are implemented  
* Data is fetched from an API or provided data source  
* Loading, error, and empty states are handled  
* Users can search and filter projects or tasks  
* Users can create and update tasks through the frontend  
* Context API is used for shared state  
* A custom hook is implemented  
* `useRef` is used for a practical feature  
* Lazy loading is implemented  
* The application is deployed to Vercel  
* The GitHub repository includes clear documentation

