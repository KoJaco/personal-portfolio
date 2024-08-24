'use client'

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { FormattedDate } from '../formatted-date'
import { ArrowRight, FileVideo } from 'lucide-react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { Blocks, Check, ChevronsDownUp, Tag, Terminal } from 'lucide-react'

import { CustomButton } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

type ProjectsData = {
  id: string
  title: string
  date: string
  description: string
  technologies: string[]
  tags: string[]
  languages: string[]
}

interface Props {
  projectsData: ProjectsData[]
}

const ProjectsList = ({ projectsData }: Props) => {
  const [filters, setFilters] = useState(filtersData)

  const [displayedProjects, setDisplayedProjects] = useState(projectsData)

  useEffect(() => {
    // debounce method rather than useMemo... if instant feedback is desired, should go with memoization.
    const timer = setTimeout(() => {
      // Create a copy of the projects data to filter
      let filteredProjects = [...projectsData]

      // Iterate over each filter category
      Object.values(filters).forEach((filter) => {
        // Get the active values for the current filter category
        const activeValues = filter.values
          .filter((val) => val.active)
          .map((val) => val.title)

        // If there are active filters, filter the projects
        if (activeValues.length > 0) {
          filteredProjects = filteredProjects.filter((project) => {
            // Check if the project matches any of the active filter values
            if (filter.id === 'Tags') {
              return project.tags.some((tag) => activeValues.includes(tag))
            } else if (filter.id === 'Technologies') {
              return project.technologies.some((tech) =>
                activeValues.includes(tech),
              )
            } else if (filter.id === 'Languages') {
              return project.languages.some((lang) =>
                activeValues.includes(lang),
              )
            }
            return false
          })
        }
      })
      // Update the displayed projects with the filtered projects
      setDisplayedProjects(filteredProjects)
    }, 300)

    // clear timer if filters change
    return () => clearTimeout(timer)
  }, [filters, projectsData])

  const renderListItems = (items: string[], category: FilterKey) => {
    return (
      <ul className="flex gap-x-2 text-sm">
        {items.map((item, index) => {
          const isActive = filters[category].values.some(
            (val) => val.title === item && val.active,
          )
          return (
            <li
              key={`${item}-${index}`}
              className={clsx(
                'text-muted-foreground flex items-center gap-x-2 rounded-lg bg-white/5 px-2 py-1',
                isActive && 'text-primary/90 border border-sky-300/50',
              )}
            >
              {item}
              {filters[category].icon}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="flex gap-x-32 pb-24">
      <div className="absolute left-24">
        <h2>Filters</h2>
        <FilterMenu filterOptions={filters} setFilterOptions={setFilters} />
      </div>

      {/* main content */}
      <main className="ml-[200px]">
        {/* filter display */}

        <div className="mb-[18px] mt-[18px] flex max-w-xl flex-wrap gap-x-0 gap-y-2">
          {Object.values(filters).map((option) => {
            const displayedValues = option.values.filter((val) => val.active)

            if (!displayedValues.length) return

            return (
              <ul
                key={option.id}
                className="mx-6 flex flex-wrap gap-x-2 text-sm"
              >
                {displayedValues.map((val, index) => (
                  <motion.li
                    key={index}
                    className="text-muted-foreground flex items-center gap-x-2 rounded-lg bg-white/5 px-2 py-1"
                  >
                    {val.title}
                    {option.icon}
                  </motion.li>
                ))}
              </ul>
            )
          })}
        </div>

        <section id="project-list">
          <div className="relative flex flex-col gap-x-8 gap-y-16 transition-all duration-300">
            <AnimatePresence>
              {displayedProjects.map((project) => {
                return (
                  <motion.div
                    key={project.id}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="w-full max-w-2xl rounded-lg border-0 bg-transparent hover:bg-white/5">
                      <CardHeader className="space-y-4">
                        <span className="text-muted-foreground/50 flex items-center gap-x-2 text-sm">
                          <span className="bg-primary/90 h-1 w-1 rounded-full" />{' '}
                          <FormattedDate
                            date={project.date}
                            className="self-start"
                          />
                        </span>
                        <CardTitle className="leading-6 tracking-wide">
                          {project.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <CardDescription className="max-w-2xl">
                          {project.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {project.tags &&
                            renderListItems(project.tags, 'Tags')}

                          {project.technologies &&
                            renderListItems(
                              project.technologies,
                              'Technologies',
                            )}

                          {project.languages &&
                            renderListItems(project.languages, 'Languages')}
                        </div>
                        <Link
                          href="#"
                          className="flex items-center gap-x-2 text-sm text-sky-300 hover:underline"
                        >
                          Read Article <ArrowRight className="h-4 w-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectsList

type FilterKey = 'Tags' | 'Technologies' | 'Languages'

type Filter = {
  id: FilterKey
  icon: React.ReactNode
  values: { title: string; active: boolean }[]
}

type FiltersData = Record<FilterKey, Filter>

const filtersData: FiltersData = {
  Tags: {
    id: 'Tags',
    icon: (
      <Tag className="text-muted-foreground ml-auto h-4 w-4 opacity-50 group-hover/filter:text-sky-300 group-hover/filter:opacity-100" />
    ),
    values: [
      { title: 'Web App', active: false },
      { title: 'Web Site', active: false },
      { title: 'CLI Tool', active: false },
      { title: 'AI Integration', active: false },
      { title: 'UI Component', active: false },
    ],
  },
  Technologies: {
    id: 'Technologies',
    icon: (
      <Blocks className="text-muted-foreground ml-auto h-4 w-4 opacity-50 group-hover/filter:text-sky-300 group-hover/filter:opacity-100" />
    ),
    values: [
      { title: 'Next.js', active: false },
      { title: 'Vite', active: false },
      { title: 'Chrome', active: false },
    ],
  },
  Languages: {
    id: 'Languages',
    icon: (
      <Terminal className="text-muted-foreground ml-auto h-4 w-4 opacity-50 group-hover/filter:text-sky-300 group-hover/filter:opacity-100" />
    ),
    values: [
      { title: 'TypeScript', active: false },
      { title: 'GoLang', active: false },
      { title: 'Zig', active: false },
      { title: 'Python', active: false },
    ],
  },
}

type FilterMenuProps = {
  filterOptions: FiltersData
  setFilterOptions: (value: FiltersData) => void
}

const FilterMenu = ({ filterOptions, setFilterOptions }: FilterMenuProps) => {
  const handleFilterChecked = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement>,
      optionTitle: FilterKey,
      valueIndex: number,
      activeValue: boolean,
    ) => {
      event.preventDefault()

      const updatedValue = {
        ...filterOptions[optionTitle].values[valueIndex],
        active: activeValue,
      }

      // Copy the original array and update the specific value
      const newValues = [...filterOptions[optionTitle].values]
      newValues[valueIndex] = updatedValue

      // Update the filterOptions with the new values
      const newFilterOptions = {
        ...filterOptions,
        [optionTitle]: { ...filterOptions[optionTitle], values: newValues },
      }

      setFilterOptions(newFilterOptions)
    },
    [filterOptions, setFilterOptions],
  )

  return (
    <menu className="text-primary/90 w-[150px] space-y-3 rounded-lg border border-opacity-50 px-1 py-2 text-sm focus-within:ring-1 focus-within:ring-white/25">
      {Object.values(filterOptions).map((filter, index) => {
        return (
          <li key={index} className="w-full">
            <Collapsible className="flex w-full flex-col items-start rounded-md">
              <CollapsibleTrigger className="group/filter flex w-full items-center justify-between rounded-lg px-2 py-1 hover:bg-white/10">
                {filter.id}
                {filter.icon}
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 w-full space-y-1">
                {filter.values.map((val, index) => (
                  <CustomButton
                    key={val.title}
                    name={val.title}
                    type="button"
                    variant="ghost"
                    className={clsx(
                      'text-primary/50 flex h-auto w-full justify-between py-1 text-sm hover:bg-white/10',
                      val.active && 'bg-white/5',
                    )}
                    onClick={(event) =>
                      handleFilterChecked(event, filter.id, index, !val.active)
                    }
                  >
                    <span className="whitespace-normal break-words text-start">
                      {val.title}
                    </span>
                    {val.active && <Check className="h-4 w-4" />}
                  </CustomButton>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </li>
        )
      })}
    </menu>
  )
}
