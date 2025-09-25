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
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image ? image.src : placeholder.src})` }}>
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

        <div className="absolute bottom-6 right-6 flex items-center space-x-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {demo && (
            <Link
              href={demo}
              target='_blank'
              className="flex justify-center items-center w-12 h-12 rounded-full border-2 border-white text-white transition-all duration-300 bg-transparent hover:bg-white hover:text-[#201435] hover:scale-110"
              aria-label="View Demo"
            >
              <FaPlay size={20} />
            </Link>
          )}
          {code && (
            <Link
              href={code}
              target='_blank'
              className="flex justify-center items-center w-12 h-12 rounded-full border-2 border-white text-white transition-all duration-300 bg-transparent hover:bg-white hover:text-[#201435] hover:scale-110"
              aria-label="View Code"
            >
              <FaCode size={20} />
            </Link>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default SingleProject;


//