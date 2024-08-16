import React from 'react'
import { Action, DataMap as DM, System, SystemTypeEnum } from '../types'
import { useSystemApi } from '../api/useSystemApi'
import { DataMapContext } from './DataMapContext'
import { DataMapColumn } from './DataMapColumn'

// move to own file
const reducer = (state: DM, action: Action) => {
  switch (action.type) {
    case 'DELETE_SYSTEM':
      if (action.payload.system_type === SystemTypeEnum.DATABASE) {
        return {
          ...state,
          databases: state.databases.filter(
            d => d.fides_key !== action.payload.fides_key,
          ),
        }
      } else if (action.payload.system_type === SystemTypeEnum.INTEGRATION) {
        return {
          ...state,
          integrations: state.integrations.filter(
            i => i.fides_key !== action.payload.fides_key,
          ),
        }
      } else {
        return {
          ...state,
          systems: state.systems.filter(
            s => s.fides_key !== action.payload.fides_key,
          ),
        }
      }
    case 'FILTER_SYSTEMS':
      return { ...state, databases: [], integrations: [] }
    default:
      return state
  }
}

export const DataMap = () => {
  const { getSystems, removeSystem } = useSystemApi()
  const dataMap = getSystems()
  const [state, dispatch] = React.useReducer(reducer, dataMap)

  const handleFilterSystems = () => {
    dispatch({ type: 'FILTER_SYSTEMS' })
  }

  const handleDeleteSystem = (system: System) => {
    // if this was a real API, the call would likely be async
    // and the dispatch would happen in a "then" on success
    // we could also have some error handling if the call
    // errors out
    if (removeSystem(system)) {
      dispatch({ type: 'DELETE_SYSTEM', payload: system })
    }
  }

  return (
    <DataMapContext.Provider value={[state, dispatch]}>
      <h1 className="text-2xl font-bold">Data Map</h1>
      {/* create Toolbar component when adding more filters and move button there */}
      <button
        className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleFilterSystems}
      >
        Filter Systems Only
      </button>
      <div className="grid grid-cols-3 gap-4">
        <DataMapColumn
          title="System"
          systems={state.systems}
          handleDeleteSystem={handleDeleteSystem}
        />
        <DataMapColumn
          title="Database"
          systems={state.databases}
          handleDeleteSystem={handleDeleteSystem}
        />
        <DataMapColumn
          title="Integration"
          systems={state.integrations}
          handleDeleteSystem={handleDeleteSystem}
        />
      </div>
    </DataMapContext.Provider>
  )
}
