Backend Setup:

cd backend
npm init -i
npm i express mongoose nodemon jsonwebtoken cookie-parser bcryptjs cors dotenv datauri chalk multer sharp socket.io

in package.json
add

in scripts
add

dev: nodemon index.js

now => npm run dev , will work

MongoDB Setup:

Create a cluster
connect the cluster using current ip
it will provide a connction string copy this and add this in .env file

frontened setup =>
cd frontend
npm create vite@latest
remove everything from app.css

setup tailwind css => from webite type install vite with react !

npm i axios
go to the site uishadcn and search copy and paste in terminal to download toaster (sooner )t!

redux toolkit install

install redux dev tools

redux-persist
when my pages gets refresh , the redux state seen in redux dev tools get reset to make it persist we need to install redux persist

npm i redux-persist socket.io-clinet

also we need to copy some code from site to the store.js
also you will need to import it
and also import in main.js and warp components inside this tag
