'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  ArrowLeftToLine,
  GitBranchPlus,
  House,
  Info,
  Maximize,
  Minimize,
  Send,
} from 'lucide-react'
import Link from 'next/link'
import { CustomButton } from './ui/button'

import { usePathname } from 'next/navigation'

const navItems = [
  { title: 'home', href: '/', icon: <House className="h-4 w-4" /> },
  {
    title: 'projects',
    href: '/projects',
    icon: <GitBranchPlus className="h-4 w-4" />,
  },
  { title: 'info', href: '/info', icon: <Info className="h-4 w-4" /> },
  { title: 'contact', href: '/contact', icon: <Send className="h-4 w-4" /> },
]

export const DesktopNavigation = () => {
  // TODO: Update transition timing function
  const [isIconsOnly, setIsIconsOnly] = useState(false)
  const [isMini, setIsMini] = useState(false)

  const pathname = usePathname()

  return (
    <div
      className={clsx(
        'bg-background/50 absolute w-auto max-w-[200px] space-y-2 divide-y overflow-hidden rounded-lg border border-opacity-50 text-sm shadow backdrop-blur-md transition-all duration-300',
        isIconsOnly ? 'px-1' : 'px-2',
        isMini ? 'py-1' : 'pb-1 pt-3',
      )}
    >
      {isMini ? (
        <CustomButton
          variant="ghost"
          size="icon"
          title="Toggle Open Menu"
          className="group/maximize text-primary/90 hover:text-primary flex w-auto items-center justify-between gap-x-8 px-2 hover:bg-white/10"
          onClick={() => setIsMini(!isMini)}
        >
          <Maximize className="h-4 w-4 group-hover/maximize:text-sky-300" />
        </CustomButton>
      ) : (
        <>
          <menu
            className={clsx(
              isIconsOnly ? 'space-y-3' : 'space-y-1',
              'transition-all duration-300',
            )}
          >
            {navItems.map((item, index) => {
              return (
                <li key={index} className="group">
                  <Link
                    href={item.href}
                    className={clsx(
                      'text-primary/90 hover:text-primary flex w-full items-center justify-between gap-x-8 rounded-md py-0.5 capitalize transition-colors duration-300 hover:bg-white/10',
                      isIconsOnly ? 'px-1' : 'px-2',
                      pathname === item.href && 'bg-white/5',
                    )}
                  >
                    {!isIconsOnly && <span>{item.title}</span>}

                    <span
                      className={clsx(
                        'text-muted-foreground transition-all duration-300 group-hover:scale-105 group-hover:text-sky-300',
                        isIconsOnly ? 'mx-auto' : '',
                        pathname === item.href && 'text-sky-300/50',
                      )}
                    >
                      {item.icon}
                    </span>
                  </Link>
                </li>
              )
            })}
          </menu>

          <div className="flex w-full justify-between px-1 pt-1">
            <CustomButton
              size="icon"
              variant="ghost"
              title="Toggle Icon's Only"
              className="text-primary/90 rounded-md px-1 py-0.5 capitalize hover:scale-105 hover:bg-white/10 hover:text-sky-300"
              onClick={() => setIsIconsOnly(!isIconsOnly)}
            >
              <ArrowLeftToLine
                className={clsx(
                  'h-4 w-4',
                  isIconsOnly
                    ? 'text-muted-foreground rotate-180 hover:text-sky-300'
                    : '',
                )}
              />
            </CustomButton>

            {!isIconsOnly && (
              <CustomButton
                size="icon"
                variant="ghost"
                title="Toggle Mini Menu"
                className="text-primary/90 rounded-md hover:scale-105 hover:bg-white/10 hover:text-sky-300"
                onClick={() => setIsMini(!isMini)}
              >
                <Minimize className="h-4 w-4" />
              </CustomButton>
            )}
          </div>
        </>
      )}
    </div>
  )
}
