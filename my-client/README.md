# IFN666_25se1 Assessment 02 Submission

**Student name:**  Prajwal Cheyur Raghavendra

**Student ID:** n11698063

# Response to marking criteria

## (API) Core: Application architecture (1 mark)

- **One line description:**  The backend is built with Express.js and MongoDB (Mongoose), and the frontend is a separate React SPA using Vite and Mantine for UI.
- **Video timestamp:** 0.00
- **Relevant files**
   - server/server.js
   - client/src/main.jsx

## (API) Core: Endpoints (2 marks)

- **One line description:**  CRUD endpoints for user, videos (/videos) and nested comments (/videos/:videoId/comments), plus auth under /auth.
- **Video timestamp:** 5.45
- **Relevant files**
    server/src/routes/videoRoutes.js
    server/src/routes/commentRoutes.js

    

| Method | Endpoint                   | Auth | Body (JSON)                                                    |
|--------|----------------------------|------|----------------------------------------------------------------|
| POST   | `/users`                   | No   | `{ "username":"user1","email":"user1@example.com","password":"pass123" }` |
| POST   | `/users/login`             | No   | `{ "email":"user1@example.com","password":"pass123" }`         |

User CRUD
| Method | Endpoint                   | Auth | Body (JSON)                   |
|--------|----------------------------|------|-------------------------------|
| GET    | `/users`                   | Yes  | —                             |
| GET    | `/users/:id`               | Yes  | —                             |
| PUT    | `/users/:id`               | Yes  | e.g. `{ "username":"newname" }` |
| DELETE | `/users/:id`               | Yes  | —                             |


User’s Videos
| Method | Endpoint                   | Auth | Body |
|--------|----------------------------|------|------|
| GET    | `/users/:id/videos`        | Yes  | —    |

Video CRUD & Queries
| Method | Endpoint                                                    | Auth | Body (JSON)                                                 |
|--------|-------------------------------------------------------------|------|-------------------------------------------------------------|
| GET    | `/videos`                                                   | No   | —   |
| GET    | `/videos?user=<id>&page=1&limit=5&sortBy=title&sortOrder=asc` | No   | —   |
| GET    | `/videos/:id`                                               | No   | —   |
| POST   | `/videos`                                                   | Yes  | `{ "title":"My Video","url":"https://…","description":"…" }` |
| PUT    | `/videos/:id`                                               | Yes  | e.g. `{ "title":"Updated Title" }`                          |
| DELETE | `/videos/:id`                                               | Yes  | —   |


Nested Comments on a Video
| Method | Endpoint                          | Auth | Body (JSON)                   |
|--------|-----------------------------------|------|-------------------------------|
| GET    | `/videos/:videoId/comments`       | No   | —                             |
| POST   | `/videos/:videoId/comments`       | Yes  | `{ "text":"Great vid!" }`     |



Comment CRUD & Queries
| Method | Endpoint                                     | Auth | Body (JSON)                         |
|--------|----------------------------------------------|------|-------------------------------------|
| GET    | `/comments`                                  | No   | —                                   |
| GET    | `/comments?video=<id>&user=<id>`             | No   | —                                   |
| GET    | `/comments/:id`                              | No   | —                                   |
| POST   | `/comments`                                  | Yes  | `{ "text":"Nice!", "video":"<videoId>" }` |
| PUT    | `/comments/:id`                              | Yes  | `{ "text":"Edited comment" }`       |
| DELETE | `/comments/:id`                              | Yes  | —                                   |

## (API) Core: Data model (3 marks)

- **One line description:** Mongoose schemas for Video (title, description, url, user, comments) and Comment (text, video, user).
- **Video timestamp:** 0.10
- **Relevant files**
    server/src/models/Video.js
    server/src/models/Comment.js

## (API) Core: Data interface (3 marks)

- **One line description:** JSON request/response formats for creating, reading, updating, and deleting videos and comments.
- **Video timestamp:** 0.30
- **Relevant files**
    server/src/controllers/videoController.js
    server/src/controllers/commentController.js

## (API) Core: Deployment to web server (3 marks)

- **One line description:**  Deployed the api to the React and vite Application
- **Video timestamp:** 2.00
- **Relevant files**
    client/

## (API) Core: API testing with Postman (3 marks)

- **One line description:**  Postman collection includes tests for all protected and public endpoints, including auth, video CRUD, comment CRUD.
- **Video timestamp:** 0.40 and 5.50
- **Relevant files**
   - server/API-Collection.json

## (API) Additional: Authentication (3 marks)

- **One line description:** JWT‐based login and signup under /auth/login and /auth/register, middleware protects video/comment routes.
- **Video timestamp:** 2.00
- **Relevant files**
    server/src/routes/authRoutes.js
    server/src/middleware/authMiddleware.js

## (API) Additional: Input validation (3 marks)

- **One line description:** Basic server‐side checks for required fields (title, url, text).
- **Video timestamp:** 3.25
- **Relevant files**
    server/src/controllers/videoController.js (line checks)
    server/src/controllers/commentController.js


## (API) Additional: Rate limiting (3 marks)

- **One line description:** Rate limiting applied via express-rate-limit middleware on all API routes (100 requests per 15 minutes per IP).
- **Video timestamp:** 13
- **Relevant files**
    server/src/middleware/rateLimiter.js
    server/server.js (where middleware is applied)

## (API) Additional: Query filtering (3 marks)

- **One line description:** Server‐side filtering via ?search=… to match title or description (case‐insensitive).
- **Video timestamp:** 4.20
- **Relevant files**
   

## (API) Additional: Pagination (3 marks)

- **One line description:** Server‐side pagination with ?page= and ?limit=, returns totalPages in response.
- **Video timestamp:** 3.55
- **Relevant files**
    server/src/controllers/videoController.js (pagination in getAllVideos)      

## (API) Additional: Role-based Access Control (3 marks)

- **One line description:** all authenticated users may delete only their own videos/comments.
- **Video timestamp:** 4.50
- **Relevant files**
    server/src/routes/authroutes
    client/src/pages/profile





---


## (Client) Core: Application architecture (3 marks)

- **One line description:** React SPA built with Vite, using Mantine UI for components, React Router for routing, and Context API for auth state.
- **Video timestamp:** 0.00
- **Relevant files**
    client/src/App.jsx

## (Client) Core: User interface design (3 marks)

- **One line description:** Responsive layout via AppShell (header, navbar, main), pages for landing, login, register, videos, upload, profile.
- **Video timestamp:** 1.10
- **Relevant files**
    client/src/pages/LandingPage.jsx
    client/src/components/Layout.jsx

## (Client) Core: React components (3 marks)

- **One line description:** Reusable components: VideoCard, Comment box, ProtectedRoute, plus page‐specific components.
- **Video timestamp:** 13.20
- **Relevant files**
    client/src/components/reusableComponents/VideoCard.jsx
    client/src/components/PrivateRoute.jsx

## (Client) Core: State management (3 marks)

- **One line description:** Context API for auth, local component state for forms, and page state for lists (search, pagination).
- **Video timestamp:** 13.40    
- **Relevant files**
    client/src/context/AuthContext.jsx
    client/src/pages/AllVideos.jsx

## (Client) Core: API integration (3 marks)

- **One line description:** fetch calls in React pages/components to backend endpoints with proper headers and error handling.
- **Video timestamp:** 2.00
- **Relevant files**
    client/src/pages/UploadVideoMetadata.jsx
    client/src/pages/VideoDetail.jsx

## (Client) Additional: Authentication (3 marks)

- **One line description:** Login/register forms store JWT and user in localStorage, useAuth hook exposes and protects routes.
- **Video timestamp:** 2.00
- **Relevant files**
    client/src/context/AuthContext.jsx
    client/src/pages/LoginPage.jsx

## (Client) Additional: Input validation (3 marks)

- **One line description:** Client‐side form checks for required fields, length restrictions, and valid URL formats.
- **Video timestamp:** 3.10
- **Relevant files**
    client/src/pages/RegisterPage.jsx
    client/src/pages/UploadVideoMetadata.jsx

## (Client) Additional: Rate limiting (3 marks)

- **One line description:** Client‐side debouncing of the search input (300 ms) to limit API calls during rapid typing. q
- **Video timestamp:**  1.25
- **Relevant files**
    client/src/pages/AllVideos.jsx (debounce logic around setSearch)

## (Client) Additional: Search and Sort (3 marks)

- **One line description:** Search bar and sort selects in All Videos page drive server queries (?search, sortBy, sortOrder).
- **Video timestamp:** 4.25
- **Relevant files**
    client/src/pages/AllVideos.jsx

## (Client) Additional: Pagination (3 marks)

- **One line description:** Mantine <Pagination> component controls page state and updates server query ?page=.
- **Video timestamp:** 3.55
- **Relevant files**
    client/src/pages/AllVideos.jsx
