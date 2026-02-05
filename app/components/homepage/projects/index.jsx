"use client";

import { useState, useEffect } from 'react';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import ProjectModal from './project-modal';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState(projectsData);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/projects`
        );
        
        if (response.data.success) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to static data if API fails
        setProjects(projectsData);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24">
      <div className="sticky top-10 mb-12">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0 w-fit text-white px-5 py-3 text-xl rounded-md font-semibold tracking-wide">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {loading ? (
        <div className="pt-24 text-center text-[#d3d8e8]">
          <p>Loading projects...</p>
        </div>
      ) : (
        <div className="pt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id || project.id}
              className="flex flex-col h-full cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
              onClick={() => openModal(project)}
            >
              <ProjectCard key={`card-${project._id || project.id}`} project={project} />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-12 px-4">
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/shivangjoshii" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <FaGithub size={30} className="text-white hover:text-gray-400 transition-colors" />
          </Link>
          <Link href="https://linkedin.com/in/mrpawan01" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <FaLinkedin size={30} className="text-white hover:text-blue-400 transition-colors" />
          </Link>
        </div>
        <Link href="/admin/dashboard" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
          Manage projects →
        </Link>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        project={selectedProject}
      />
    </div>
  );
};

export default Projects;