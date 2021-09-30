import { createTarea, deleteTarea, editTarea } from '../api/tareasAPI'
import { NEW_EVENT, EDIT_EVENT, DELETE_EVENT } from '../types'

export const addEvent = (payload) => {
  return async (dispatch) => {
    const res = await createTarea(payload).catch(() => {
      console.log('ERROR AL CREAR')
    })
    dispatch({ type: NEW_EVENT, payload: res })
  }
}

export const editEvent = (payload) => {
  return async (dispatch) => {
    dispatch({ type: EDIT_EVENT, payload })
    await editTarea(payload).catch(() => console.log('ERROR AL EDITAR'))
  }
}

export const deleteEvent = (payload) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENT, payload })
    await deleteTarea(payload.tareaId).catch(() => {
      console.log('ERROR AL ELIMINAR')
    })
  }
}
