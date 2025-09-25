// single-project.jsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaCode, FaPlay } from 'react-icons/fa';
import placeholder from '/public/png/placeholder.png';

const SingleProject = ({ project }) => {
  // De-structure 'tools' instead of 'tags'
  const { name, description, tools, code, demo, image } = project; 

  return (
    <div className='group relative w-full h-[400px] flex flex-col items-center justify-end overflow-hidden cursor-pointer rounded-xl transition-all duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(102,51,153,0.5)]'>
      <div className="absolute inset-0">
        <Image
          src={image || placeholder.src}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201435]/90 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full p-6 flex flex-col justify-end h-full">
        <div className="w-full transition-all duration-500 group-hover:transform group-hover:translate-y-[-20px]">
          <h2 className='text-white font-semibold text-2xl leading-tight mb-2 capitalize'>
            {name}
          </h2>
          <p className="text-gray-300 text-sm leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        <div className="absolute top-4 left-4 flex flex-col gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0">
          {demo && (
            <Link
              href={demo}
              target='_blank'
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-600/90 backdrop-blur-sm text-white text-sm font-medium transition-all duration-300 hover:bg-violet-500 hover:scale-105"
              aria-label="View Demo"
            >
              <FaPlay size={14} />
              <span>Demo</span>
            </Link>
          )}
          {code && (
            <Link
              href={code}
              target='_blank'
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-600/90 backdrop-blur-sm text-white text-sm font-medium transition-all duration-300 hover:bg-pink-500 hover:scale-105"
              aria-label="View Code"
            >
              <FaCode size={14} />
              <span>Code</span>
            </Link>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default SingleProject;


//