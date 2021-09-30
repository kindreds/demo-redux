import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addEvent, deleteEvent, editEvent } from '../actions'

const useCreateItem = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [itemSelected, setItemSelected] = useState({ id: null })
  const { events = [] } = useSelector((state) => state.events)

  const handleAdd = (fileUrl) => {
    if (text.trim() === '') return

    if (isEdit && itemSelected.tareaId) {
      const { link } = itemSelected
      const payload = {
        ...itemSelected,
        titulo: text,
        link: fileUrl ?? link
      }
      dispatch(editEvent(payload))
      setText('')
      return setIsEdit(false)
    }

    const payload = {
      titulo: text,
      link: fileUrl
    }

    dispatch(addEvent(payload))

    setText('')
  }

  const handleDelete = (payload) => {
    dispatch(deleteEvent(payload))
  }

  const handleEdit = (payload) => {
    setIsEdit(true)
    setText(payload.titulo)
    setItemSelected(payload)
  }

  const handleChangeText = ({ target: { value } }) => {
    setText(value)
  }

  return {
    // state
    text,
    events,
    isEdit,
    itemSelected,
    // functions
    setText,
    handleAdd,
    handleEdit,
    handleDelete,
    handleChangeText
  }
}

export default useCreateItem
