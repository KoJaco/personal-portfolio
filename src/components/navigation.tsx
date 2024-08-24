'use client'

import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
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
  const [isColumns, setIsColumns] = useState(true)

  const pathname = usePathname()

  return (
    <div
      className={clsx(
        'group/menu bg-background/50 absolute top-24 z-50 flex border border-opacity-50 text-sm shadow backdrop-blur-md transition-all duration-300',
        isIconsOnly
          ? 'w-auto rounded-[20px] px-1'
          : isColumns
            ? 'w-[130px] px-2'
            : 'px-2',
        isMini ? 'py-1' : isColumns ? 'pb-1 pt-3' : 'py-1',
        isColumns
          ? 'right-24 max-w-[200px] flex-col gap-y-2 divide-y overflow-hidden rounded-lg'
          : 'mx-auto w-auto max-w-none flex-row items-center gap-x-2 divide-x rounded-[20px]',
      )}
    >
      {isMini ? (
        <CustomButton
          variant="ghost"
          size="icon"
          title="Toggle Open Menu"
          className={clsx(
            'group/maximize text-primary/90 hover:text-primary flex w-full items-center justify-between px-2 text-sm hover:bg-white/10',
            isColumns ? 'gap-x-0' : 'gap-x-2',
          )}
          onClick={() => setIsMini(!isMini)}
        >
          Nav Menu
          <Maximize className="text-muted-foreground h-4 w-4 group-hover/maximize:text-sky-300" />
        </CustomButton>
      ) : (
        <>
          <nav
            className={clsx(
              'flex',
              isIconsOnly ? 'gap-y-2' : 'gap-y-1',
              isColumns ? 'flex-col gap-x-0' : 'flex-row gap-x-2',
              'transition-all duration-300',
            )}
          >
            {navItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={clsx(
                    'text-primary/90 hover:text-primary group flex w-full items-center justify-between rounded-md py-0.5 capitalize transition-colors duration-300 hover:bg-white/10',
                    isIconsOnly ? 'px-1' : 'px-2',
                    pathname === item.href && 'bg-white/5',
                    isColumns ? 'gap-x-8' : 'gap-x-4',
                  )}
                >
                  {!isIconsOnly && <span>{item.title}</span>}

                  <span
                    title={
                      isIconsOnly
                        ? `Navigate to ${item.title.toLocaleUpperCase()}`
                        : ''
                    }
                    className={clsx(
                      'text-muted-foreground transition-all duration-300 group-hover:scale-105 group-hover:text-sky-300',
                      isIconsOnly ? 'mx-auto' : '',
                      pathname === item.href && 'text-sky-300/50',
                    )}
                  >
                    {item.icon}
                  </span>
                </Link>
              )
            })}
          </nav>

          <div
            className={clsx(
              'flex w-full justify-between px-1 opacity-75 transition-opacity duration-300 group-hover/menu:opacity-100',

              isColumns && isIconsOnly ? 'flex-col pt-1' : 'gap-x-1 py-1',
              !isColumns && 'pl-3',
            )}
          >
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

            <CustomButton
              size="icon"
              variant="ghost"
              title={
                isColumns ? 'Align Items in Rows' : 'Align Items in Columns'
              }
              className="text-primary/90 rounded-md px-1 py-0.5 capitalize hover:scale-105 hover:bg-white/10 hover:text-sky-300"
              onClick={() => setIsColumns(!isColumns)}
            >
              {isColumns ? (
                <AlignHorizontalJustifyCenter
                  className={clsx(
                    'h-4 w-4',
                    isIconsOnly
                      ? 'text-muted-foreground rotate-180 hover:text-sky-300'
                      : '',
                  )}
                />
              ) : (
                <AlignVerticalJustifyCenter
                  className={clsx(
                    'h-4 w-4',
                    isIconsOnly
                      ? 'text-muted-foreground rotate-180 hover:text-sky-300'
                      : '',
                  )}
                />
              )}
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
