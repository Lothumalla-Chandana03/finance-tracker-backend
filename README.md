# Finance Tracker – Backend

## About the Project
This is the backend of the Finance Tracker application. It is developed using Node.js and Express.js with MongoDB as the database.

It provides REST APIs for user authentication and transaction management. Both the web and mobile applications connect to this backend.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Features
- User Registration and Login
- Secure Password Hashing
- JWT-Based Authentication
- Add, View, Update and Delete Transactions
- Search Transactions
- Filter Transactions
- Income and Expense Category Summary
- Export Transactions to CSV

## Project Structure
- `config/` – Database connection
- `controllers/` – Application logic
- `middleware/` – Authentication verification
- `models/` – MongoDB schemas
- `routes/` – API endpoints
- `utils/` – CSV export utility
- `server.js` – Backend entry point

## API Endpoints

### Authentication
| Method | Endpoint |
|---|---|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |

### Transactions
| Method | Endpoint |
|---|---|
| POST | `/api/transactions/add` |
| GET | `/api/transactions/all` |
| PUT | `/api/transactions/update/:id` |
| DELETE | `/api/transactions/delete/:id` |
| GET | `/api/transactions/filter` |
| GET | `/api/transactions/search` |
| GET | `/api/transactions/category-summary` |
| GET | `/api/transactions/export-csv` |

## Installation and Setup

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and configure:

```env
PORT=5000
MONGOOSE_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend using the start script defined in `package.json`.

## Deployment
The backend is deployed on Render.

## Purpose
This backend manages application data, handles business logic, provides secure authentication and connects the frontend applications with MongoDB.
