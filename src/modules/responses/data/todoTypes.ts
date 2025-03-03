export interface ITodo {
  id?: string
  title: string
  description?: string
  completed: boolean
}

export interface IQuery {
  page: number
  limit: number
  total?: number
}
