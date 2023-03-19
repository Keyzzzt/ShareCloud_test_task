export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
type ActionType = InferActionTypes<typeof actions>
export type WeekType = {
  week: number
  year: number
}
export type TaskType = {
  id: string
  startDate: string
  endDate: string
  name: string
  weeksInQuarter?: Array<WeekType[]>
  allWeeksAndYears?: WeekType[]
}

type StateType = {
  tasks: TaskType[]
  error: null | string
}

const initialState: StateType = {
  tasks: [],
  error: null,
}
export const appReducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case 'TASKS/UPDATE-TITLE': {
      return { ...state, tasks: state.tasks.map((task) => (task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task)) }
    }
    default:
      return state
  }
}

export const actions = {
  updateTaskTitle: (title: string, taskId: string) =>
    ({
      type: 'TASKS/UPDATE-TITLE',
      payload: { title, taskId },
    } as const),
}
