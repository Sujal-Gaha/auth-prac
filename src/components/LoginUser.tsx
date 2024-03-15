import { useMutation } from "@tanstack/react-query";
import { TLoginUserInput, TLoginUserOutput } from "../type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginUser() {
    const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUserMutation = useMutation<
    TLoginUserOutput,
    Error,
    TLoginUserInput
  >({
    mutationFn: async (body) => {
      const response = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: body.username,
          password: body.password,
        }),
      });
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      console.log("Logged in successfully", data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLoginUser = async () => {
    await loginUserMutation.mutateAsync({
      username,
      password,
    });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLoginUser();
        }}
      >
        <div>
          <label htmlFor="username">Enter Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Enter Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}
