import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { TRegisterUserInput, TRegisterUserOutput } from "../type";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function RegisterUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [password, setPassword] = useState("");

  const registerUserMutation = useMutation<
    TRegisterUserOutput,
    Error,
    TRegisterUserInput
  >({
    mutationFn: async (body) => {
      const response = await fetch(
        "http://localhost:8080/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: body.username,
            email: body.email,
            role: body.role,
            password: body.password,
          }),
        }
      );
      const data = response.json();
      return data;
    },
    onSuccess: (data) => {
      console.log("Registered User ", data);
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error while registerting ", error);
    },
  });

  const handleRegisterUser = async () => {
    await registerUserMutation.mutateAsync({
      username,
      email,
      role,
      password,
    });
  };

  const registerNotification = () =>
    toast("Registered successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleRegisterUser();
          registerNotification();
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div>
          <label htmlFor="username">Enter Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="email">Enter Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="role">Enter Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            required
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
            }}
            disabled
          />
        </div>

        <div>
          <label htmlFor="password">Enter Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  );
}
