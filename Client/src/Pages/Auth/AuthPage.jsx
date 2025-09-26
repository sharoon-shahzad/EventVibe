import Tabs from "@/components/Atoms/Shared/Tabs";
import Login from "@/components/Molecules/AuthSection/Login";
import Signin from "@/components/Molecules/AuthSection/Signin";
import React from "react";

const AuthPage = () => {
  const tabs = [
    { tabName: "Login", component: <Login /> },
    { tabName: "Sign in", component: <Signin /> },
  ];
  return (
    <div className="mt-4 lg:m-20">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default AuthPage;
