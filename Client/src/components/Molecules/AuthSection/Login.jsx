import React, { useState } from "react";
import InputComponent from "@/components/Atoms/Shared/Input";
import Button from "@/components/Atoms/Buttons/Button";
import { useAuthLogic } from "@/hooks/authLogic/useAuthLogic";
import LoadingOverlay from "@/components/Atoms/Loader/LoadingOverlay";

const Login = ({ H2, Card }) => {
  const { handleLogin, isLoginLoading, loginError } = useAuthLogic();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    handleLogin(formData);
  };

  return (
    <LoadingOverlay isLoading={isLoginLoading}>
      <Card heightAndWidth={"max-w-md"}>
        <H2>Login</H2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputComponent
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputComponent
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoginLoading}
            className="w-full"
          >
            Log In
          </Button>

          {loginError && (
            <p className="text-red-500 text-sm mt-2">
              {loginError?.data?.message || "Login failed. Try again."}
            </p>
          )}
        </form>
      </Card>
    </LoadingOverlay>
  );
};

export default Login;
