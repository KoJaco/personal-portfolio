import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { nanoid } from 'nanoid'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import ProjectsList from '@/components/projects/list'

const projectsData = [
  {
    id: nanoid(),
    title: 'A GoLang CLI app for normalising images',
    date: new Date().toISOString(),
    description:
      'When clients send me images for designing and building their websites they are often not in exact aspect ratios. I wanted to build a simple CLI tool that normalises the aspect ratio of images to be in a predefined list of all the most common aspect ratios I use for web.',
    technologies: [],
    tags: ['CLI Tool'],
    languages: ['GoLang'],
  },
  {
    id: nanoid(),
    title: 'Next.js Headless CMS',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    description:
      'A headless CMS built with Next.js and GoLang, allowing users to manage multiple websites with a flexible, modern interface. Supports custom draft URLs for previewing content before publishing.',
    technologies: ['Next.js', 'SQLite', 'Turso', 'Drizzle ORM'],
    tags: ['Web App', 'CMS'],
    languages: ['TypeScript', 'GoLang'],
  },
  {
    id: nanoid(),
    title: 'Chrome Extension for On-the-fly Web Accessibility',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    description:
      'A Chrome extension designed to improve web accessibility on the fly. It uses a sidebar and context menu powered by ChatGPT to help users interact with and understand web content better.',
    technologies: ['React', 'Tailwind CSS', 'Chrome Extensions API'],
    tags: ['Chrome Extension', 'Accessibility'],
    languages: ['JavaScript', 'TypeScript'],
  },
  {
    id: nanoid(),
    title: 'AI-powered Voice Commands for Web Navigation',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    description:
      "An AI-powered Chrome extension that enables users to navigate and interact with web pages using voice commands. It integrates with OpenAI's Whisper API for speech recognition.",
    technologies: ['React', 'OpenAI Whisper API', 'Tailwind CSS'],
    tags: ['Chrome Extension', 'AI Integration'],
    languages: ['JavaScript', 'TypeScript'],
  },
  {
    id: nanoid(),
    title: 'Zig Language Learning Project',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    description:
      'A series of small projects aimed at learning the Zig programming language, focusing on low-level programming concepts that can be applied in web development.',
    technologies: ['Zig', 'C'],
    tags: ['Learning', 'Low-level'],
    languages: ['Zig'],
  },
  {
    id: nanoid(),
    title: 'Python Data Processing Script for Marine Electrical Systems',
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
    description:
      'A Python script designed to process and analyze data collected from marine electrical systems. It helps in monitoring and diagnosing electrical issues on boats.',
    technologies: ['Python', 'Pandas'],
    tags: ['Script', 'Data Processing'],
    languages: ['Python'],
  },
]

const ProjectPage = () => {
  return (
    <div className="flex h-auto w-full flex-col pt-32">
      <div className="flex h-full w-full gap-x-32">
        <header className="mx-auto space-y-2">
          <h1 className="text-primary text-2xl font-light tracking-wide">
            Projects
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
            voluptatibus commodi mollitia maxime facilis deleniti labore
            consectetur! Quidem ratione sunt vel ipsam odio voluptatibus
            architecto doloremque? Iusto animi saepe repudiandae!
          </p>
        </header>
      </div>

      <Separator className="mx-auto mt-8 w-full max-w-xl" />
      <ProjectsList projectsData={projectsData} />
    </div>
  )
}

// const ProjectPage = () => {
//   return (
//     <ScrollArea className="mt-32 flex h-full w-full">
//       {/* sidebar filters */}

//       <div className="flex h-full w-full flex-col pb-32">
//         <div className="flex h-full w-full gap-x-32">
//           <header className="mx-auto space-y-2">
//             <h1 className="text-primary text-2xl font-light tracking-wide">
//               Projects
//             </h1>
//             <p className="text-muted-foreground max-w-xl">
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//               Similique voluptatibus commodi mollitia maxime facilis deleniti
//               labore consectetur! Quidem ratione sunt vel ipsam odio
//               voluptatibus architecto doloremque? Iusto animi saepe repudiandae!
//             </p>
//           </header>
//         </div>

//         <Separator className="mx-auto mt-8 w-full max-w-xl" />
//         <ProjectsList projectsData={projectsData} />
//       </div>

//       <ScrollBar orientation="horizontal" className="ml-4" />
//     </ScrollArea>
//   )
// }

export default ProjectPage
