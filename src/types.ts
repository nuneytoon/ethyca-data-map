export enum SystemTypeEnum {
  APPLICATION,
  SERVICE,
  DATABASE,
  INTEGRATION,
}

// Used string[] instead of modeling further
// types because nesting could go pretty deep
type PrivacyDeclaration = {
  data_categories: string[]
  data_subjects: string[]
  data_use: string
  name: string
}

export type System = {
  description: string
  fides_key: string
  name: string
  privacy_declarations: PrivacyDeclaration[]
  system_dependencies: string[]
  system_type: SystemTypeEnum
}

export type DataMap = {
  systems: System[]
  databases: System[]
  integrations: System[]
}

export type Action =
  | { type: 'ADD_SYSTEM'; payload: System }
  | { type: 'DELETE_SYSTEM'; payload: System }
  | { type: 'FILTER_SYSTEMS' }
