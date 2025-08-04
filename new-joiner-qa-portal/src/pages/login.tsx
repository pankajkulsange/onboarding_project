import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [role, setRole] = useState<"manager" | "new-joiner" | "">("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) login(role as "manager" | "new-joiner");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
        <label className="block mb-2">Select Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">-- Choose Role --</option>
          <option value="manager">Manager</option>
          <option value="new-joiner">New Joiner</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}