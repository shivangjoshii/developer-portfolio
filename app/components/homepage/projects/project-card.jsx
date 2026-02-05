// @flow strict
"use client";

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group relative h-full cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1224] via-[#0f1535] to-[#0a0d37] border border-[#1b2c68a0] transition-all duration-500 hover:border-[#16f2b3] hover:shadow-[0_0_40px_rgba(22,242,179,0.3)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-violet-600/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:via-violet-600/5 group-hover:to-pink-500/5 transition-all duration-500"></div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
        {/* Header with status badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 lg:h-3 lg:w-3 rounded-full bg-red-400 animate-pulse"></div>
            <div className="h-2.5 w-2.5 lg:h-3 lg:w-3 rounded-full bg-orange-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="h-2.5 w-2.5 lg:h-3 lg:w-3 rounded-full bg-green-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
          {project.featured && (
            <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-violet-600 text-white text-xs font-bold rounded-full shadow-lg shadow-pink-500/20">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl lg:text-2xl font-bold text-[#16f2b3] mb-3 line-clamp-2 group-hover:text-white transition-colors duration-300">
          {project.name}
        </h3>

        {/* Project Image with overlay */}
        <div className="relative h-44 lg:h-52 w-full mb-4 rounded-xl overflow-hidden border border-[#353a52] group-hover:border-[#16f2b3]/50 transition-all duration-300 shadow-lg">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setImageLoaded(true)}
            priority={false}
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b2c68a0] to-[#353a52] animate-pulse"></div>
          )}
        </div>

        {/* Description */}
        <p className="text-[#d3d8e8] text-sm lg:text-base leading-relaxed mb-4 line-clamp-2 flex-grow group-hover:text-[#d3d8e8] transition-colors duration-300">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.slice(0, 3).map((tool, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-[#1b2c68a0] text-[#16f2b3] text-xs font-semibold rounded-full border border-[#353a52] group-hover:border-[#16f2b3] group-hover:bg-[#16f2b3]/10 transition-all duration-300 hover:scale-105"
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="px-2.5 py-1 bg-[#1b2c68a0] text-[#16f2b3] text-xs font-semibold rounded-full border border-[#353a52]">
              +{project.tools.length - 3}
            </span>
          )}
        </div>

        {/* Role - appears on hover */}
        <p className="text-[#16f2b3] text-xs font-semibold mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
          <span className="text-base">👨‍💻</span> {project.role}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-[#353a52] group-hover:border-[#16f2b3]/30 transition-colors duration-300">
          {project.code ? (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1b2c68a0] hover:bg-[#16f2b3] text-[#16f2b3] hover:text-[#0d1224] rounded-lg transition-all duration-300 font-semibold group/btn border border-[#353a52] hover:border-[#16f2b3]"
            >
              <FaGithub size={16} className="group-hover/btn:scale-110 transition-transform" />
              <span className="hidden sm:inline">Code</span>
            </a>
          ) : null}
          
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white rounded-lg transition-all duration-300 font-semibold group/btn shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
            >
              <FaExternalLinkAlt size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Live Demo</span>
            </a>
          ) : null}

          {!project.code && !project.demo && (
            <div className="flex-1 px-4 py-2.5 bg-[#1b2c68a0]/50 text-[#d3d8e8] rounded-lg text-center text-sm cursor-not-allowed opacity-50 border border-[#353a52]">
              Coming Soon
            </div>
          )}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}

export default ProjectCard;