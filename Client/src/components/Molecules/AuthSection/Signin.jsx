import Button from "@/components/Atoms/Buttons/Button";
import LoadingOverlay from "@/components/Atoms/Loader/LoadingOverlay";
import InputComponent from "@/components/Atoms/Shared/Input";
import { useAuthLogic } from "@/hooks/authLogic/useAuthLogic";
import React, { useState } from "react";

const Signin = ({ H2, Card }) => {
  const { handleRegister, isRegisterLoading, registerError } = useAuthLogic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    handleRegister(formData);
  };

  return (
    <LoadingOverlay isLoading={isRegisterLoading}>
      <Card>
        <H2>Create Account</H2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputComponent
            type="text"
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <InputComponent
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isRegisterLoading}
            className="w-full"
          >
            Sign Up
          </Button>
          {registerError && (
            <p className="text-red-500 text-sm mt-2">
              {registerError?.data?.message || "Sign in failed. Try again."}
            </p>
          )}
        </form>
      </Card>
    </LoadingOverlay>
  );
};

export default Signin;
