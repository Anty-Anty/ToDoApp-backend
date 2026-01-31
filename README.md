# ToDoApp – Backend

A Node.js + Express backend API for a personal to-do application with user authentication, protected routes, and MongoDB persistence.

Frontend repository:
https://github.com/Anty-Anty/ToDoApp-frontend

## Live API: (used by the frontend demo)
https://todoappoo.netlify.app/

⚠️ Cold start notice
This API is hosted on Render’s free tier.
The first request after inactivity may take up to ~60 seconds due to server cold start.

### Demo Login & Authentication
This app requires authentication.
Reviewers can quickly create an account using a test email.
No email verification is required.

To explore the app without creating an account, use the demo credentials:

`Email: test1@test.com` 
`Password: 111111`

## Tech Stack

- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- express-validator
- REST API architecture

## Why I Built This

I built this backend to practice real-world REST API design, authentication, authorization, and data consistency patterns using MongoDB and Mongoose.

The focus was on:
- Secure user-specific data access
- Clean separation of concerns
- Reliable error handling
- Transaction-safe database updates

## Key Technical Decisions
<details>

### 1. JWT Authentication & Route Protection
- Authentication implemented using JSON Web Tokens
- Custom check-auth middleware protects all item routes
- Tokens validated on every request
- User identity derived from token payload (req.userData)

### 2. User-Scoped Data Access
- To-do items are always queried by creator ID
- Only the item creator can:
    - Update items
    - Delete items
- Unauthorized access returns appropriate HTTP errors (401 / 403)

### 3. MongoDB Transactions

- Used Mongoose sessions and transactions for critical operations
- Ensures consistency between:
    - User documents
    - Item documents
- Prevents orphaned references on create/delete

### 4. Validation & Error Handling

- Request validation via express-validator
Centralized HTTP error model
- Global error-handling middleware
- Consistent API error responses

### 5. Clean REST Structure
- Logical route grouping:
    - `/api/users`
    - `/api/items`
- Controllers separated from routes
- Models isolated from business logic

</details>

## API Features
 ### 👤 Users

- User signup
- User login
- JWT token generation
- Secure password handling (if implemented in users controller)

### 📝 To-Do Items (Protected)

- Fetch items by user ID
- Create new items
- Update existing items
- Delete items
- All item routes require valid authentication token

## API Endpoints
### 🔐 Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/users/signup` | Register a new user |
| **POST** | `/api/users/login` | Log in and receive a JWT token |


### 📝 Items (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/items/user/:uid` | Fetch all items belonging to a specific user |
| **POST** | `/api/items` | Create a new item |
| **PATCH** | `/api/items/:iid` | Update an existing item |
| **DELETE** | `/api/items/:iid` | Delete an item |

## Security Notes

All item routes are protected with JWT middleware
Users can only access and modify their own items
Validation prevents malformed or incomplete requests

## Notes

This backend was built as a portfolio and learning project, emphasizing correctness, security, and maintainability over unnecessary abstractions.

It is designed to support a real frontend application and mirrors real production API patterns.