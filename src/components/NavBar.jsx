import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineAppstore,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

const NavBar = () => {
  const { showToast, data } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const mutation = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async (data) => {
      showToast({ message: data.message, type: "success" });
      navigate("/auth", { state: { replace: true } });
    },
    onError: async (data) => {
      showToast({ message: data.message, type: "error" });
    },
  });

  const talentItems = [
    { name: "Build CV", link: "/", icon: <AiOutlineUser /> },
    { name: "Find Job", link: "/find-jobs", icon: <AiOutlineSearch /> },
    {
      name: "Applications",
      link: "/applications",
      icon: <AiOutlineAppstore />,
    },
  ];
  const recruiterItems = [
    { name: "Company", link: "/company", icon: <AiOutlineUser /> },
    { name: "Job Post", link: "/job-posts", icon: <AiOutlineAppstore /> },
    { name: "Find Talent", link: "/find-talent", icon: <AiOutlineSearch /> },
  ];

  const menuItems = data?.role === "Talent" ? talentItems : recruiterItems;

  return (
    <>
      {/* Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }
                    transition-transform duration-300 ease-in-out bg-gradient-to-br from-blue-500 to-gray-300 text-white w-64 h-screen shadow-lg flex flex-col z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/30">
          <div className="text-2xl font-bold text-white">TalentFind</div>
          <div
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Menu"
            className="text-white cursor-pointer text-2xl"
          >
            ✕
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 mt-6 space-y-4 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              className={
                ({ isActive }) =>
                  `flex items-center p-3 text-sm rounded-lg transition duration-300 
                ${
                  isActive
                    ? "bg-blue-800 text-white"
                    : "text-white hover:bg-blue-700"
                }` // Menandai link aktif
              }
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/30">
          <Button
            variant="outline"
            className="flex items-center w-full text-sm text-white border-2 border-white/50 hover:bg-red-700"
            onClick={() => mutation.mutate()}
          >
            <AiOutlineLogout className="mr-3" />
            Logout
          </Button>
        </div>
      </div>

      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-20 p-2 text-white bg-blue-700 hover:bg-blue-600 rounded-full shadow-lg"
        aria-label="Open Menu"
      >
        <FiMenu size={24} />
      </Button>

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      ></div>
    </>
  );
};

export default NavBar;
