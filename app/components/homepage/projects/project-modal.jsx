"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaCode, FaPlay, FaTimes } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectModal({ isOpen, closeModal, project }) {
  if (!project) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#0d1224] border border-[#1b2c68a0] p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-white">
                    {project.name}
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                {/* Project Image */}
                <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={project.image || '/png/placeholder.png'}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Role Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    {project.role}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-[#16f2b3] mb-2">Description</h4>
                  <p className="text-gray-300">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-[#16f2b3] mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-[#1a1443] text-gray-300 border border-[#353a52]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"
                    >
                      <FaPlay size={16} />
                      <span>Live Demo</span>
                    </Link>
                  )}
                  {project.code && (
                    <Link
                      href={project.code}
                      target="_blank"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:from-pink-600 hover:to-violet-600 transition-all duration-300"
                    >
                      <FaCode size={16} />
                      <span>Source Code</span>
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1443] text-white hover:bg-[#252053] transition-all duration-300 border border-[#353a52]"
                  >
                    <MdEmail size={16} />
                    <span>Contact</span>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}