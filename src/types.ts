export type Instance = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
  instances: Instance[]
}
