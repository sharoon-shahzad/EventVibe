import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/authSlice";
import { H2, H3 } from "@/components/Atoms/Shared/headings";
import Card from "@/components/Atoms/Card/Card";
import Button from "@/components/Atoms/Buttons/Button";
import Tabs from "@/components/Atoms/Shared/Tabs";
import { getIcon } from "@/utils/helpers/iconsHelper";
import { useNavigate } from "react-router-dom";
import { LAYOUT_DASHBOARD, urls } from "@/utils/routes/route-paths";

const UserProfileDashboard = ({
  role,
  stats,
  tabs,
  quickActions = [],
  userRoleLabel = "User",
  statsConfig = null, // Allow custom stats config
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const UserIcon = getIcon("profile");
  const CalendarIcon = getIcon("calendar");
  const UsersIcon = getIcon("users");
  const CheckIcon = getIcon("check");

  // Default stats config if not provided
  const getDefaultStatsConfig = () => {
    if (role === "admin") {
      return [
        {
          value: stats.created,
          label: "Events Created",
          icon: CalendarIcon,
          color: "blue",
        },
        {
          value: stats.totalAttendees,
          label: "Total Attendees",
          icon: UsersIcon,
          color: "green",
        },
        {
          value: stats.active,
          label: "Active Events",
          icon: CheckIcon,
          color: "purple",
        },
        {
          value: stats.passed,
          label: "Passed Events",
          icon: UserIcon,
          color: "yellow",
        },
      ];
    }
    // Default to user stats
    return [
      {
        value: stats.registered,
        label: "Events Registered",
        icon: CalendarIcon,
        color: "blue",
      },
      {
        value: stats.attended,
        label: "Events Attended",
        icon: CheckIcon,
        color: "green",
      },
      {
        value: stats.unattended,
        label: "Pending Attendance",
        icon: UsersIcon,
        color: "purple",
      },
    ];
  };

  const statsCards = statsConfig || getDefaultStatsConfig();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div>
        {" "}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <H2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {currentUser?.name}
            </H2>
            <p className="text-gray-600">
              {userRoleLabel} • {currentUser?.email}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Member since{" "}
              {new Date(
                currentUser?.createdAt || new Date()
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-evenly items-center flex-wrap gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="p-4 text-center">
            <div
              className={`w-10 h-10 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3`}
            >
              <stat.icon weight="fill" className={`text-${stat.color}-600`} />
            </div>
            <H3 className="text-xl font-bold text-gray-900">{stat.value}</H3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <Card className="p-4 sm:p-6">
          <H3 className="text-xl font-semibold mb-4">Quick Actions</H3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                className="w-full"
                onClick={action.onClick}
              >
                {action.text}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Tabs */}
      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default UserProfileDashboard;
