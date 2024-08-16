import React, { Dispatch } from 'react'
import { Action, DataMap, System } from '../types'

const defaultState = {
  systems: [] as System[],
  databases: [] as System[],
  integrations: [] as System[],
}

const defaultAction = () => {}

export const DataMapContext = React.createContext<
  (DataMap | Dispatch<Action>)[]
>([defaultState, defaultAction])
