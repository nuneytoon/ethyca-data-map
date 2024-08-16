import _ from 'lodash'
import sampleData from '../sample_data.json'
import { DataMap, System, SystemTypeEnum } from '../types'

// utility function using lodash for
// object equality check to remove dups
const uniqObject = <T>(arr: T[]): T[] => {
  const result: T[] = []
  for (const item of arr) {
    const found = result.some(v => _.isEqual(v, item))
    if (!found) result.push(item)
  }
  return result
}

// hook to expose "API" CRUD interactions
export const useSystemApi = () => {
  const getSystems = (): DataMap => {
    return {
      systems: uniqObject(
        sampleData
          .filter(
            s =>
              !['database', 'integration'].includes(
                s.system_type.toLowerCase(),
              ),
          )
          .map(fs => ({
            description: fs.description,
            fides_key: fs.fides_key,
            name: fs.name,
            system_dependencies: fs.system_dependencies,
            privacy_declarations: fs.privacy_declarations,
            system_type:
              fs.system_type.toLowerCase() === 'application'
                ? SystemTypeEnum.APPLICATION
                : SystemTypeEnum.INTEGRATION,
          })),
      ),
      databases: uniqObject(
        sampleData
          .filter(s => s.system_type.toLowerCase() === 'database')
          .map(fs => ({
            description: fs.description,
            fides_key: fs.fides_key,
            name: fs.name,
            system_dependencies: fs.system_dependencies,
            privacy_declarations: fs.privacy_declarations,
            system_type: SystemTypeEnum.DATABASE,
          })),
      ),
      integrations: uniqObject(
        sampleData
          .filter(s => s.system_type.toLowerCase() === 'integration')
          .map(fs => ({
            description: fs.description,
            fides_key: fs.fides_key,
            name: fs.name,
            system_dependencies: fs.system_dependencies,
            privacy_declarations: fs.privacy_declarations,
            system_type: SystemTypeEnum.INTEGRATION,
          })),
      ),
    }
  }

  const addSystem = () => {}

  const removeSystem = (system: System): boolean => {
    // could alter file here but just going to choose to
    // alter application state. this would be where any
    // real backend calls would take place
    return true
  }

  return {
    getSystems,
    addSystem,
    removeSystem,
  }
}
