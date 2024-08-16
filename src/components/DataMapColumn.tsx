import React from 'react'
import { System } from '../types'
import { DataMapItem } from './DataMapItem'

type DataColumnProps = {
  title: string
  systems: System[]
  handleDeleteSystem: (system: System) => void
}

export const DataMapColumn = ({
  title,
  systems,
  handleDeleteSystem,
}: DataColumnProps) => {
  return (
    <div className="p-3 flex flex-col gap-4 rounded-lg">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="bg-slate-50 p-4 grid grid-cols-1 gap-4 text-sm leading-6">
        {systems.map(s => (
          <DataMapItem
            key={s.fides_key}
            system={s}
            handleDeleteSystem={handleDeleteSystem}
          />
        ))}
        <li className="flex">
          <a
            href="/new"
            className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3"
          >
            <svg
              className="group-hover:text-blue-500 mb-1 text-slate-400"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            New {title.toLowerCase()}
          </a>
        </li>
      </ul>
    </div>
  )
}
