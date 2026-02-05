"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import EditProjectModal from "./edit-project-modal";

export default function ProjectsList({ projects, adminKey, onProjectsChange }) {
  const [editingProject, setEditingProject] = useState(null);

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/projects/${projectId}`,
        {
          headers: {
            "x-admin-key": adminKey,
          },
        }
      );
      toast.success("Project deleted successfully!");
      onProjectsChange();
    } catch (error) {
      toast.error("Failed to delete project");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-8 text-[#d3d8e8]">
          No projects found. Start by adding your first project!
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gradient-to-r from-[#0d1224] to-[#0a0d37] border border-[#1b2c68a0] rounded-lg p-6 hover:border-[#16f2b3] transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#16f2b3]">
                      {project.name}
                    </h3>
                    {project.featured && (
                      <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded">
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded ${
                        project.status === "active"
                          ? "bg-green-500 text-white"
                          : project.status === "draft"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-[#d3d8e8] mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#1b2c68a0] text-[#16f2b3] text-xs rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-[#d3d8e8] space-y-1">
                    <p>
                      <strong>Role:</strong> {project.role}
                    </p>
                    {project.code && (
                      <p>
                        <strong>Code:</strong>{" "}
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#16f2b3] hover:underline"
                        >
                          View
                        </a>
                      </p>
                    )}
                    {project.demo && (
                      <p>
                        <strong>Demo:</strong>{" "}
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#16f2b3] hover:underline"
                        >
                          View
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="p-2 bg-[#1b2c68a0] text-[#16f2b3] hover:bg-[#16f2b3] hover:text-[#0d1224] rounded transition-all duration-300"
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 bg-red-500 bg-opacity-20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-all duration-300"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          adminKey={adminKey}
          onClose={() => setEditingProject(null)}
          onSuccess={() => {
            onProjectsChange();
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}
