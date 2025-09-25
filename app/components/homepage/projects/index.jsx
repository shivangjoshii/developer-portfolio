"use client";


import { useState } from 'react';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import ProjectModal from './project-modal';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <div className="pt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.slice(0, 4).map((project, index) => (
          <div
            id={`project-card-${index + 1}`}
            key={index}
            className="flex flex-col h-full cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
            onClick={() => openModal(project)}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-12 px-4">
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/shivangjoshii" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <FaGithub size={30} className="text-white hover:text-gray-400 transition-colors" />
          </Link>
          <Link href="https://linkedin.com/in/mrpawan01" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <FaLinkedin size={30} className="text-white hover:text-blue-400 transition-colors" />
          </Link>
        </div>
        <Link href="#" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
          View all projects →
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