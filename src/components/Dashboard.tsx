import { useMutation } from "@tanstack/react-query";

export function Dashboard() {
  const logoutUserMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:8080/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "": "" }),
      });
      const data = response.json();
      console.log("data on fetch ", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("data on success ", data);
    },
    onError: (error) => {
      console.log("data on error ", error);
    },
  });

  const handleLogoutUser = async () => {
    await logoutUserMutation.mutateAsync();
  };

  return (
    <div>
      <p>Dashboard</p>
      <button type="button" onClick={handleLogoutUser}>
        Logout
      </button>
    </div>
  );
}
