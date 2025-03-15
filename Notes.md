1# MERN Stack Development Cheatsheet

## Web Development Fundamentals

### CORS (Cross-Origin Resource Sharing)

**Why Do We Need CORS?**  
When your frontend (React, Angular, Vue) runs on a different domain (e.g., http://localhost:3000), and your backend (Node.js, Express) is on another (http://localhost:5000), browsers block these requests unless CORS is enabled. This is a security feature built into web browsers to prevent unauthorized cross-domain interactions.

### Development Tools

**Nodemon**  
Nodemon is a development tool that automatically restarts your Node.js application whenever it detects changes in the code. This eliminates the need to manually stop and restart the server after every update.

**dotenv.config()**  
`dotenv.config();` loads environment variables from a .env file into process.env in a Node.js application. This allows you to keep sensitive information like API keys and database credentials separate from your code.

## Database

### MongoDB Atlas

MongoDB Atlas is a fully managed cloud database service provided by MongoDB.

#### Key Features of MongoDB Atlas

| Feature                   | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| Cloud-Based               | No need to set up local MongoDB, available on AWS, Azure, and GCP. |
| Automatic Scaling         | Adjusts database resources based on demand.                        |
| Backup & Recovery         | Automated backups with point-in-time recovery.                     |
| Serverless & Multi-Region | Deploy databases globally for low-latency access.                  |

## Frontend Development

### React Router DOM

Whenever you want to change the page in a React application, you use React Router DOM.

**How to use:**

- Pass the children prop to the main route component as array of objects (components)
- `Link` is used to redirect the user to another page on the client side when button is clicked
- `navigate` is used to send the user automatically to another page on the client side

### UI Component Libraries

**Lucid React**  
It gets downloaded when we setup Vite React, provides UI components.

**Shadcn**  
Website to bring UI components. To use it, first install and copy and paste the code.

### React Concepts

**Why do we use a callback in onClick?**  
It helps to pass anything to callback function as parameter!

```jsx
// Example
onClick={() => handleFunction(parameter)}
```

**React Icons**  
Use the React Icons site for icons in your application.

**Controlled Components**  
We use the `value` prop in tags to pass input data entered by user to hook, to control the state:

```jsx
<input
  value={text} // Controlled by state
  onChange={(e) => setText(e.target.value)}
/>
// Updates state on change
```

If we don't pass the value prop, then the input tag maintains the value on its own but this isn't good for state management control.

**Props**  
Props are used to send the data from one component to another.

**Disabled Attribute**  
The disabled attribute in React (or HTML) is used to disable an interactive element, such as a button or input field. When an element has disabled={true}, it becomes unclickable and unresponsive.

```jsx
<Button
  disabled={!text.trim()} //Disables button when text is empty or just whitespace
  onClick={sendMessageHandler}
  variant="outline" // css part don't focus on it
>
  Send Message
</Button>
```

Why Do We Use builder in Redux (RTK) with createSlice?

builder is an API provided by Redux Toolkit inside extraReducers

In Redux Toolkit (RTK), builder is used when defining extra reducers inside createSlice. It helps handle asynchronous actions (like API calls) using createAsyncThunk.

redux-persist
when my pages gets refresh , the redux state seen in redux tookit get reset to make it persist we need to install redux persist

npm i redux-persist

also we need to copy some code from site to the store.js
also you will need to import it
and also import in main.js and warp components inside this tag

useRef()
✅ 1. It is used to target a DOM element and interact with it directly without causing re-renders.
✅ 2. It can store a reference (ref) and pass it to another component.
✅ 3. It does NOT cause a re-render when its value changes

Onchange and Onclick
onchange is used to pass the event.target.value
while
onClick we pass the handlers

Alternative of redux toolkit
recoil for small and medium projects ( it easily handles the async actions no need to use CreateasyncThunk or builder in redux )

why we create custom hooks ?
To Avoid Repeating useDispatch() and useSelector() Everywhere

Action.payload in redux
when we pass arguments in dispatch than that data is called as action.payload

example : const [age, setAge] = useState(0)
dispatch(setState(age))
the age here is action.payload

and my reducer will be like :

const reducer = (state , action) => {
state.age = action.payload;
}

Socket.io
🔹 io.on(event, callback)
Listens for events at the server level.
Typically used for handling new connections.
Runs once per client

socket.on(event, callback)
Listens for client-specific events.
Runs inside the io.on('connection') callback.
Runs for individual users

// very important
Flow between the backend and frontend =>

Where is "getOnlineUsers" Used?
1️⃣ Server-Side (Backend)
In your server code:
io.emit('getOnlineUsers', Object.keys(userSocketMap));
The server broadcasts the event "getOnlineUsers" to all connected clients.
The second argument (Object.keys(userSocketMap)) is the data sent with the event (list of online users).

2️⃣ Client-Side (Frontend)
In your React component (App.js):
socketio.on("tOnlineUsers", (onlineUsers) => {
dispatch(setOnlineUsers(onlineUsers));
});
The client listens for "getOnlineUsers".
When received, it updates the Redux store with the list of online users.

Protected Routes
In simple terms if no protected routes are used then , i can chnage the search url and access the page without login , that's why

Protected routes ensure that only authenticated users can access certain pages in your React app.

Deployement on render
go to frontend from terminal and run => npm run build

go to backend main file
app.use(express.static(path.join(**dirname, "/frontend/dist")));
app.get("\*", (req, res) => {
res.sendFile(path.resolve(**dirname, "frontend", "dist", "index.html"));
});

move all the backend .env and package.json and package-lock.json to the root

now in root package.json in scripts =>
"dev": "nodemon backend/index.js",
"build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
"start": "node backend/index.jss"

delete the node_modules from backend and frontend and delete the dist folder from frontend

from the terminal in root folder run => npm run build

now in terminal npm run start => to run the entire project

now in .gitignore =>
add node_modules
add package-lock.json
add package.json

push the code in git

go to render and add the .env url (use backend port) and add the commands to run and build in render

now change all the api link to the render link (hosted on render)
