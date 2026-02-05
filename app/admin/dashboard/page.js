"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "@/app/components/admin/admin-sidebar";
import ProjectsList from "@/app/components/admin/projects-list";
import AddProjectModal from "@/app/components/admin/add-project-modal";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [adminKey, setAdminKey] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const key = localStorage.getItem("adminKey");
    if (!key) {
      router.push("/admin/login");
      return;
    }
    setAdminKey(key);
    fetchProjects(key);
  }, []);

  const fetchProjects = async (key) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/projects`,
        {
          headers: {
            "x-admin-key": key,
          },
        }
      );
      setProjects(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch projects");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminKey");
    router.push("/admin/login");
    toast.success("Logged out successfully");
  };

  if (!adminKey) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0d1224]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-[#16f2b3]">Projects Management</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300"
            >
              + Add Project
            </button>
          </div>

          {loading ? (
            <div className="text-center text-[#d3d8e8]">Loading projects...</div>
          ) : (
            <ProjectsList 
              projects={projects} 
              adminKey={adminKey}
              onProjectsChange={() => fetchProjects(adminKey)}
            />
          )}

          {showAddModal && (
            <AddProjectModal
              adminKey={adminKey}
              onClose={() => setShowAddModal(false)}
              onSuccess={() => {
                fetchProjects(adminKey);
                setShowAddModal(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
