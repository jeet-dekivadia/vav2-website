# VAV2: Virtual Assistant for AI Makerspace

Welcome to **VAV2**! This repository provides a Next.js-based application that guides users through the end-to-end process of setting up a machine learning (ML) project—from selecting a task and uploading data to visualizing results and interacting with an AI assistant. This README is intended for **new software engineers** who need to quickly understand the structure, components, and overall workflow of the project.

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
3. [Getting Started](#getting-started)  
4. [Project Structure Overview](#project-structure-overview)  
5. [Core Components](#core-components)  
6. [Page-by-Page Breakdown](#page-by-page-breakdown)  
7. [State Management](#state-management)  
8. [Utility Components](#utility-components)  
9. [Implementing the Backend](#implementing-the-backend)  
10. [Testing](#testing)  
11. [Documentation](#documentation)  
12. [Deployment](#deployment)  
13. [License](#license)  
14. [Contributing](#contributing)  
15. [Thank You](#thank-you)

## 1. Project Overview
- **Name**: VAV2 (Virtual Assistant for AI Makerspace)  
- **Description**: Guides users through an ML pipeline, including task selection, data upload, data visualization, model training, and result visualization.  
- **Key Feature**: An AI-powered chat interface that assists users with their project setup and helps clarify steps in the ML workflow.

## 2. Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **UI/UX**: [React](https://reactjs.org/)  
- **Charting**: [Recharts](https://recharts.org/) for data visualization  
- **State Management**: React Context API (ProjectProvider and ChatProvider)  
- **Optional Backend Services** (Python, TensorFlow.js, scikit-learn) for ML tasks

## 3. Getting Started
### Prerequisites
1. **Node.js** (v14 or above)  
2. **npm** or **yarn**  
3. (Optional) **Python** environment set up if you plan to integrate with Python-based ML services.

### Installation
1. **Download** or **pull** the repository to your local machine.  
2. Navigate to the project folder and install dependencies (using `npm install` or `yarn install`).


## 5. Core Components
### a. **Layout** (`app/layout.tsx`)
- Wraps all pages with a consistent layout.
- Integrates the `ThemeProvider`, `ProjectProvider`, and `ChatProvider`.
- Renders the `Navigation` sidebar and `ChatInterface` so they’re available across all pages.

### b. **Navigation** (`components/navigation.tsx`)
- Provides a sidebar containing links to all the main pages: Task Selection, Data Selection, Visualization, Model Training, and Results.

### c. **ChatInterface** (`components/chat/chat-interface.tsx`)
- Enables AI assistant chat functionality.
- Uses the `ChatProvider` for managing chat conversations.

## 6. Page-by-Page Breakdown
### a. **Landing Page** (`app/page.tsx`)
- Introduces VAV2 and outlines its capabilities.
- Contains a call-to-action button that starts the ML project workflow.

### b. **Task Selection** (`app/task-selection/page.tsx`)
- Allows users to choose the ML task (e.g., classification, regression).
- Updates the global project state with the selected task.

### c. **Data Selection** (`app/data-selection/page.tsx`)
- Users can upload their dataset (CSV/Excel) and specify the target variable.
- Updates the global project state with the uploaded data.

### d. **Data Visualization** (`app/visualization/page.tsx`)
- Provides interactive charts (using `DataVisualization` component).
- Users can select different chart types to explore the data.

### e. **Model Training** (`app/model-training/page.tsx`)
- Lets users select ML algorithms and tune hyperparameters.
- Updates global state with model details (e.g., random forest, linear regression) and hyperparameters.

### f. **Results** (`app/results/page.tsx`)
- Displays performance metrics of the trained model.
- Uses the `ModelResults` component to visualize metrics.

## 7. State Management
### a. **ProjectProvider** (`components/providers/project-provider.tsx`)
- Holds the global state of the ML project (task, data, model, etc.).
- Exposes context for updating state throughout the app.

### b. **ChatProvider** (`components/providers/chat-provider.tsx`)
- Manages state for the AI chat interface.
- Exposes methods to send and retrieve chat messages.

## 8. Utility Components
### a. **DataVisualization** (`components/data-visualization.tsx`)
- Renders charts using [Recharts](https://recharts.org/).
- Dynamically updates based on user-selected chart types.

### b. **ModelResults** (`components/model-results.tsx`)
- Shows model performance metrics (accuracy, F1-score, etc.).
- Visualizes results with bar charts or other chart types.

## 9. Implementing the Backend
> **Note**: The current front end can be connected to a backend to handle data processing, model training, and result retrieval. Below is a suggested approach:

### a. Set up API Routes
Create a new directory `app/api` for serverless functions:
- **`/app/api/upload/route.ts`**: Handles dataset uploads.  
- **`/app/api/visualize/route.ts`**: Generates data visualizations.  
- **`/app/api/train/route.ts`**: Executes model training.  
- **`/app/api/results/route.ts`**: Retrieves trained model results.

### b. Data Processing
- **Service**: `/lib/services/data-service.ts`  
- **Responsibilities**: Reading CSV/Excel files, data cleaning, feature engineering.

### c. Model Training
- **Service**: `/lib/services/model-service.ts`  
- **Responsibilities**: Implementing algorithms (e.g., linear regression, random forest).  
- Can use Python-based ML (scikit-learn) or JavaScript-based ML (TensorFlow.js).

### d. Results Generation
- **Service**: `/lib/services/results-service.ts`  
- **Responsibilities**: Calculate performance metrics (accuracy, precision, etc.) and format them for frontend consumption.

### e. API Integration
- Replace mock data in the frontend with real fetch/axios calls to the API routes.
- Ensure proper request/response handling and error catching.

### f. Error Handling
- Implement robust error handling in both frontend and backend.
- Optionally, create an `ErrorBoundary` component to gracefully display errors to users.

### g. Authentication (Optional)
- If user accounts are necessary, integrate [NextAuth.js](https://next-auth.js.org/) or another authentication solution.

### h. Database Integration (Optional)
- For persistent data storage, integrate a database (e.g., PostgreSQL).
- Use an ORM like [Prisma](https://www.prisma.io/) to manage schema and migrations.

## 10. Testing
1. **Testing Framework**: [Jest](https://jestjs.io/)  
2. **React Components**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)  
3. **API Testing**: [Supertest](https://github.com/visionmedia/supertest)

Create a `tests` directory and add:
- **Unit Tests** for components, hooks, and utilities.  
- **Integration Tests** for end-to-end workflows (e.g., data upload, model training).

## 11. Documentation
- Create a `/docs` directory for any additional technical documentation.  
- Document:
  - **API Endpoints** (expected input/output formats)  
  - **Data Structures** (example CSV/Excel formats)  
  - **ML Algorithms** (which ones are supported, any known limitations)

## 12. Deployment
- **CI/CD**: Use GitHub Actions or another service to run tests and build automatically.  
- **Hosting Platforms**:
  - [Vercel](https://vercel.com/) (recommended for Next.js)  
  - [AWS](https://aws.amazon.com/) or [Azure](https://azure.microsoft.com/) if you need more control.  
- **Steps**:
  1. Configure environment variables (e.g., API keys, database credentials).  
  2. Set up build commands.  
  3. Connect your repository to the hosting platform for automatic deployments.

## 13. License
This project is licensed under the [MIT License](./LICENSE). Feel free to fork and adapt for your own use!

## 14. Contributing
We welcome contributions! Please create an issue or open a pull request with proposed changes. For major feature work, consider discussing it first to ensure alignment with the project roadmap.

## 15. Thank You
We hope **VAV2** helps you quickly understand the ML workflow and build your own AI-driven applications. If you have any questions or feedback, don’t hesitate to open an issue or reach out!  

**Happy coding and model building!**

