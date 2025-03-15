import { useEffect } from "react";
import ChatPage from "./components/ChatPage";
import EditProfile from "./components/EditProfile";
import Home from "./components/Home";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      //REVIEW - array of objects
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoutes>
            {" "}
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/account/edit",
        element: (
          <ProtectedRoutes>
            <EditProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoutes>
            <ChatPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    //REVIEW - bracket
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio); //REVIEW
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:8000", {
        query: {
          //REVIEW pass the query params here for backend
          userId: user?._id,
        },
        transports: ["websocket"], //REVIEW this is just a syntax for real time trasnportation
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        //REVIEW when the user who is online   gets click on logout or close the tab on browser we will disconnect the socket
        socketio.close(); //REVIEW socketio.close()
        dispatch(setSocket(null));
      };
    } else if (socket) {
      //REVIEW when the  user is not online then !
      socket.close(); //REVIEW socket.close()
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;

// REVIEW link with the backend and frontend =>

//   Where is "getOnlineUsers" Used?
// 1️⃣ Server-Side (Backend)
// In your server code:
// io.emit('getOnlineUsers', Object.keys(userSocketMap));
// The server broadcasts the event "getOnlineUsers" to all connected clients.
// The second argument (Object.keys(userSocketMap)) is the data sent with the event (list of online users).

// 2️⃣ Client-Side (Frontend)
// In your React component (App.js):
// socketio.on("tOnlineUsers", (onlineUsers) => {
//   dispatch(setOnlineUsers(onlineUsers));
// });
// The client listens for "getOnlineUsers".
// When received, it updates the Redux store with the list of online users.
