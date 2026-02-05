"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { MdClose } from "react-icons/md";
import CloudinaryUpload from "./cloudinary-upload";

export default function EditProjectModal({ project, adminKey, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    tools: project.tools.join(", "),
    role: project.role,
    code: project.code || "",
    demo: project.demo || "",
    image: project.image,
    featured: project.featured,
    status: project.status,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (imageUrl) => {
    setFormData({
      ...formData,
      image: imageUrl,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tools: formData.tools.split(",").map((tool) => tool.trim()),
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/projects/${project._id}`,
        payload,
        {
          headers: {
            "x-admin-key": adminKey,
          },
        }
      );

      toast.success("Project updated successfully!");
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update project");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-r from-[#0d1224] to-[#0a0d37] border border-[#1b2c68a0] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#16f2b3]">Edit Project</h2>
          <button
            onClick={onClose}
            className="text-[#d3d8e8] hover:text-[#16f2b3] transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#d3d8e8] mb-2">Project Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#10172d] border border-[#353a52] rounded px-3 py-2 text-white focus:border-[#16f2b3] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#d3d8e8] mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-[#10172d] border border-[#353a52] rounded px-3 py-2 text-white focus:border-[#16f2b3] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#d3d8e8] mb-2">Role *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#10172d] border border-[#353a52] rounded px-3 py-2 text-white focus:border-[#16f2b3] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#d3d8e8] mb-2">Tools (comma-separated) *</label>
              <input
                type="text"
                name="tools"
                value={formData.tools}
                onChange={handleChange}
                className="w-full bg-[#10172d] border border-[#353a52] rounded px-3 py-2 text-white focus:border-[#16f2b3] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Cloudinary Upload */}
          <CloudinaryUpload onUpload={handleImageUpload} currentImage={formData.image} />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#d3d8e8] mb-2">Code URL</label>
              <input
                type="url"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full bg-[#10172d] border border-[#353a52] rounded px-3 py-2 text-white focus:border-[#16f2b3] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#d3d8e8] mb-2">Demo URL</label>
              <input
                type="url"
                name="demo"
                value={formData.demo}
                onChange={handleChange}
                className="w-full bg-[#10172d] border border-[#353a52] rounded px-3 py-2 text-white focus:border-[#16f2b3] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-[#d3d8e8]">Featured Project</span>
              </label>
            </div>

            <div>
              <label className="block text-[#d3d8e8] mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#10172d] border border-[#353a52] rounded px-3 py-2 text-white focus:border-[#16f2b3] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold py-2 rounded transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#10172d] border border-[#353a52] text-[#d3d8e8] font-bold py-2 rounded transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
