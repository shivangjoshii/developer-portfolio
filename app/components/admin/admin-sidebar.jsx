"use client";

import React from "react";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

export default function AdminSidebar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden bg-[#16f2b3] text-[#0d1224] p-2 rounded"
      >
        <MdMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0d1224] to-[#0a0d37] border-r border-[#1b2c68a0] p-6 z-30 transform transition-transform duration-300 lg:transform-none ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-[#16f2b3]">Portfolio</h1>
            <p className="text-[#d3d8e8] text-sm">Admin Panel</p>
          </div>

          <nav className="space-y-4">
            <a
              href="/admin/dashboard"
              className="block px-4 py-2 text-[#d3d8e8] hover:text-[#16f2b3] hover:bg-[#1b2c68a0] rounded transition-all duration-300"
            >
              Dashboard
            </a>
            <a
              href="/admin/dashboard"
              className="block px-4 py-2 text-[#16f2b3] bg-[#1b2c68a0] rounded transition-all duration-300"
            >
              Projects
            </a>
            <a
              href="/admin/contacts"
              className="block px-4 py-2 text-[#d3d8e8] hover:text-[#16f2b3] hover:bg-[#1b2c68a0] rounded transition-all duration-300"
            >
              Contact Messages
            </a>
          </nav>

          <button
            onClick={onLogout}
            className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold py-2 rounded transition-all duration-300 mt-8"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        />
      )}
    </>
  );
}
