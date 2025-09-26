import Card from "@/components/Atoms/Card/Card";
import { H2 } from "@/components/Atoms/Shared/headings";
import Tabs from "@/components/Atoms/Shared/Tabs";
import Login from "@/components/Molecules/AuthSection/Login";
import Signin from "@/components/Molecules/AuthSection/Signin";
import React from "react";

const AuthPage = () => {
  const tabs = [
    { tabName: "Login", component: <Login H2={H2} Card={Card} /> },
    { tabName: "Sign in", component: <Signin H2={H2} Card={Card} /> },
  ];
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center">
      <Card heightAndWidth={"w-lg"}>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default AuthPage;
