post.jsx
in redux , add a new slice => add this reducer in store => useGetAllPosts.jsx (custom hooks ) here use dispatch and call api for getting all posts using axios => useSelector in post.jsx for accessing posts,captions,number of likes ! => pass the values to tags ! in css like :
if it image pass the prop to src attribute , if it heading pass it to h1 tag , for getting count of like use .length

In createPost.jsx => go to post handler => add this dispatch(setPosts([res.data.post, ...posts])) when a new post is suceessfully created.

in posts.jsx => useSelector for auth user => do a conditional rendering => if user is not logged in then show delee button for post else show create post button

Now implementing deletepost and updating in redux store
Post.jsx => call the api with prop => also delete the post from redux store => for this use filter method on the posts from useSelector

Now implementing like and dislike for the post :
Post.jsx => call the api with prop => also update the like in store of redux => for this use map method on the posts from useSelector => use a filter method

CommnentDialog.jsx
when the user select a post and wants to comment from the card instead of outside the card (from the section of all posts)

Flow: pass commentDailog.jsx in Post.jsx as prop =>apply use effect whenever the selected post gets changed => check for empty comments , for this use a useState =>to update the reducers a new comment useState is created with initialstate as empty array => call the api and pass the text as input json

Suggested User in right bar =>
Create a hook useGetSuggestedUsers => create a component called SuggestedUser.jsx => use this componenet in RightBar.jsx

The concept of custom is mention is in the notes.md !

userprofile.jsx a component is created => hook is creaated called useGetUserProfile => api is called in the hook => hook is called in the userProfile Component

Implemeting the profile section and edit profile section
create a profile.jsx and editprofile.jsx => profile.jsx is just a skeleton => edit profile has all the editing features .

implementing chat page and messages !

Socket.io implemenation
backend => create a socket.js file => index.js import all the export of the socket.js file => index.js remove const app = express() => since app is extracted from socket.js => npm i socket.io-client in forntend => app.jsx import io from socket.io.client => now create a slice for chat and socket => now enter this slice in store
=> In App.jsx create a useEffect with dependencies as : user and dispatch() => pass the query params for backend => check for 2 edge cases here : => 1) if user is active but logs out => 2) if the user is not online => update the store
=> listen for notification and online users which matches the backend logic.

Now Implementing the sockets in MessageController.js in backend => in sendMessage function we are defining the event for reciever's userID =>
in getMessage Function we are finding all the info of participants

in chatPage.jsx => create a hook where api is called and call this hook in the chatPage.jsx => in ChatPage.jsx create a useEffect for maintaing the redux store => create a SendMessageHandler !

TILL NOW NO REAL TIME CHAT IS IMPEMENTED !

Create a hook for RTM chat => get the socket and messages from reduxStore => create a useEffect , check for newmessage and osck =>if socket is there trigger the event (.on => listing the event ) and pass the message as newMessage and update the reduxStore => if no socket then close the socket

Protected Routes =>
create a protectedRoutecomponent => bring the authUser from the reduxStore => now check if this user exists (if it does , it means user is logged-in) => if it does render the Home component else redirect to login page => wrap this protectedRoute Component in app.jsx for each Route

in Signup.jsx => Create a useEffect => check for the user and if user is logged in then redirect it to home page only (cannot go to login oage again)

in Login.jsx => Create a useEffect => check if user is logged in then redirect it to home page only (cannot go to signup or login page untill user logs out)
