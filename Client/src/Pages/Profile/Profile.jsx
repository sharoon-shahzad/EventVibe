import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { H1 } from "@/components/Atoms/Shared/headings";
import UserUI from "./UserUI";
import AdminUI from "./AdminUI";
import { UserRole } from "@/utils/enums/useRole";
import Card from "@/components/Atoms/Card/Card";

const Profile = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Card>
      <H1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Profile
      </H1>
      {currentUser.role === UserRole.admin ? <AdminUI /> : <UserUI />}
    </Card>
  );
};

export default Profile;
