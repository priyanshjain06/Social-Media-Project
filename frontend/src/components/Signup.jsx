import { useEffect, useState } from "react";
import { Input } from "./ui/input"; //REVIEW
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setInput((prevInput) => ({
      ...prevInput, // Keep previous input values
      [fieldName]: fieldValue, // Update only the changed field
    }));
  };

  //REVIEW
  const signupHandler = async (e) => {
    e.preventDefault(); //to avoid the uncessary refreshing of the page on submit
    try {
      setLoading(true); // 1️⃣ Show a loading state

      const res = await axios.post(
        // 2️⃣ Send a POST request
        "https://instaclone-g9h5.onrender.com/api/v1/user/signup", // 3️⃣ API endpoint
        input, // 4️⃣ Data being sent (user input)
        {
          headers: {
            "Content-Type": "application/json", // 5️⃣ Set request headers
          },
          withCredentials: true, // 6️⃣ Include cookies in the request
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signupHandler} //ANCHOR -
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Signup to see photos & videos from your friends
          </p>
        </div>
        <div>
          <span className="font-medium">Username</span>
          <Input
            type="text"
            name="username" //ANCHOR
            value={input.username} //ANCHOR -
            onChange={changeEventHandler} //ANCHOR
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Signup</Button>
        )}
        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
