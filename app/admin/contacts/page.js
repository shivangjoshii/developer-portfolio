"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "@/app/components/admin/admin-sidebar";
import { MdDelete, MdMarkEmailRead } from "react-icons/md";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminKey, setAdminKey] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const key = localStorage.getItem("adminKey");
    if (!key) {
      router.push("/admin/login");
      return;
    }
    setAdminKey(key);
    fetchContacts(key);
  }, []);

  const fetchContacts = async (key) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          headers: {
            "x-admin-key": key,
          },
        }
      );
      setContacts(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch contact messages");
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

  const handleMarkAsRead = async (contactId) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/${contactId}/read`,
        {},
        {
          headers: {
            "x-admin-key": adminKey,
          },
        }
      );
      toast.success("Contact marked as read");
      fetchContacts(adminKey);
    } catch (error) {
      toast.error("Failed to mark contact as read");
    }
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm("Delete this contact message?")) {
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/${contactId}`,
        {
          headers: {
            "x-admin-key": adminKey,
          },
        }
      );
      toast.success("Contact deleted successfully");
      fetchContacts(adminKey);
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  if (!adminKey) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0d1224]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-[#16f2b3] mb-8">
            Contact Messages ({contacts.length})
          </h1>

          {loading ? (
            <div className="text-center text-[#d3d8e8]">Loading messages...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12 text-[#d3d8e8]">
              No contact messages yet.
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`bg-gradient-to-r from-[#0d1224] to-[#0a0d37] border rounded-lg p-6 transition-all duration-300 ${
                    contact.status === "new"
                      ? "border-[#16f2b3] hover:shadow-[0_0_30px_rgba(22,242,179,0.2)]"
                      : "border-[#1b2c68a0]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#16f2b3]">
                          {contact.name}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            contact.status === "new"
                              ? "bg-green-500 text-white"
                              : contact.status === "read"
                              ? "bg-yellow-500 text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-[#16f2b3] text-sm mb-3">
                        📧 {contact.email}
                      </p>
                      <p className="text-[#d3d8e8] mb-3">{contact.message}</p>
                      <p className="text-xs text-[#7a8599]">
                        {new Date(contact.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      {contact.status !== "read" && (
                        <button
                          onClick={() => handleMarkAsRead(contact._id)}
                          className="p-2 bg-[#1b2c68a0] text-[#16f2b3] hover:bg-[#16f2b3] hover:text-[#0d1224] rounded transition-all duration-300"
                          title="Mark as read"
                        >
                          <MdMarkEmailRead size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="p-2 bg-red-500 bg-opacity-20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-all duration-300"
                        title="Delete"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
