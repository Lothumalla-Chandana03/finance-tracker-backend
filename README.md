# Finance Tracker – Backend

A RESTful backend for the Finance Tracker application, built using **Node.js, Express.js and MongoDB**. It provides APIs for user authentication and income/expense transaction management. The same backend is used by the React.js web application and React Native mobile application.

## Features

- User registration and login
- Password hashing using bcryptjs
- JWT-based authentication
- Protected transaction APIs
- Add, view, update and delete transactions
- Search transactions by description
- Filter transactions by date range
- Calculate total income, total expenses and balance
- Generate category-wise transaction summaries
- Export transactions as a CSV file

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- json2csv
- Postman for API testing

## Project Structure

```text
Backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── transactionController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Transaction.js
├── routes/
│   ├── authRoutes.js
│   └── transactionRoutes.js
├── utils/
│   └── csvExport.js
├── server.js
├── package.json
└── .env.example
```

## API Endpoints

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Transaction APIs

All transaction endpoints require a valid JWT token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/transactions/add` | Add a transaction |
| GET | `/api/transactions/all` | Get all user transactions and totals |
| PUT | `/api/transactions/update/:id` | Update a transaction |
| DELETE | `/api/transactions/delete/:id` | Delete a transaction |
| GET | `/api/transactions/filter?start=YYYY-MM-DD&end=YYYY-MM-DD` | Filter by date range |
| GET | `/api/transactions/search?q=keyword` | Search by description |
| GET | `/api/transactions/category-summary` | Get category-wise totals |
| GET | `/api/transactions/export-csv` | Export transactions as CSV |

## Authentication Flow

1. A user registers with name, email and password.
2. The backend hashes the password using bcryptjs before storing it.
3. During login, the entered password is compared with the stored hash.
4. After successful login, the backend generates a JWT token.
5. The frontend sends the token in the `Authorization` header.
6. Authentication middleware verifies the token before allowing access to protected transaction APIs.

Example header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## CSV Export

The backend provides a CSV export endpoint:

```http
GET /api/transactions/export-csv
```

The export utility in `utils/csvExport.js`:

1. Retrieves transactions belonging to the authenticated user.
2. Selects transaction fields such as type, amount, category, description and date.
3. Converts the records into CSV format using `json2csv`.
4. Sends the file with the name `transactions.csv`.

The endpoint returns a 404 response if the user has no transactions.

## Database Models

### User
- name
- email
- password (hashed)

### Transaction
- userId
- type (income / expense)
- amount
- category
- date
- description

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
cd Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use your own MongoDB connection string and a strong JWT secret. Never commit your actual `.env` file.

### 4. Start the server

Development mode:

```bash
npm run dev
```

Normal mode:

```bash
npm start
```

The server uses port `5000` by default, or the port provided by the hosting platform.

### 5. Test the API

Use Postman to test signup, login and transaction endpoints. For protected routes, include the JWT token in the Authorization header.

## Deployment

The backend is deployed on Render and is used by both the web and mobile applications.

## Future Improvements

- Add automated backend tests.
- Improve request validation and error handling.
- Add pagination for transaction records.
- Add additional reporting and analytics features.

## Author

Chandana
