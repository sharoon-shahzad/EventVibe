import Button from "@/components/Atoms/Buttons/Button";
import InputComponent from "@/components/Atoms/Shared/Input";
import React, { useState } from "react";

const Signin = ({ H2, Card }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    // Add your signup logic here
    console.log("Sign up ", formData);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
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
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </Card>
  );
};

export default Signin;
