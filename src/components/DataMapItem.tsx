import React from 'react'
import { System } from '../types'

type DataMapItemProps = {
  system: System
  handleDeleteSystem: (system: System) => void
}

export const DataMapItem = ({
  system,
  handleDeleteSystem,
}: DataMapItemProps) => {
  return (
    <li className="group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm">
      <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
        <dt className="font-semibold text-slate-900">{system.name}</dt>
        <dd className="text-slate-700">
          {/* would remodel and handle this at "API" level */}
          {system.privacy_declarations.length > 0 &&
            system.privacy_declarations
              .flatMap(pd =>
                pd.data_categories.flatMap(dc => {
                  const arr = dc.split('.')
                  return arr[arr.length - 1]
                }),
              )
              .reduce((prev, curr) =>
                prev.includes(curr) ? prev : `${prev}, ${curr}`,
              )}
        </dd>
        <dt className="sr-only">Delete Button</dt>
        <dd className="col-span-2">
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white block ml-auto py-2 px-4 border border-red-500 hover:border-transparent rounded"
            onClick={() => handleDeleteSystem(system)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </dd>
      </dl>
    </li>
  )
}
