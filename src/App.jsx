import { useState } from 'react'

import { GoPlus } from 'react-icons/go'
import { useSelector, useDispatch } from 'react-redux'

import Item from './Item'
import Empty from './Empty'
import { addEvent, deleteEvent, editEvent } from './actions'

const App = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [itemSelected, setItemSelected] = useState({ id: null })
  const { events } = useSelector((state) => state.events)

  const handleAdd = () => {
    if (text.trim() === '') return

    if (isEdit && itemSelected.id) {
      const { id } = itemSelected
      dispatch(editEvent({ id, msg: text }))
      setText('')
      return setIsEdit(false)
    }

    const payload = { id: +new Date(), msg: text }
    dispatch(addEvent(payload))

    setText('')
  }

  const handleDelete = (payload) => {
    dispatch(deleteEvent(payload))
  }

  const handleEdit = (payload) => {
    setIsEdit(true)
    setText(payload.msg)
    setItemSelected(payload)
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div>
        <h1 className="display-1 mb-5">DEMO REDUX</h1>

        <div className="d-flex align-items-center mb-4">
          <input
            type="text"
            value={text}
            className="form-control"
            placeholder="Agregar Item"
            onChange={({ target: { value } }) => setText(value)}
            onKeyDown={({ key }) => {
              if (key === 'Enter') handleAdd()
            }}
          />
          <button onClick={handleAdd} className="btn btn-primary">
            <GoPlus />
          </button>
        </div>

        <ul className="p-0">
          {events.map((item) => (
            <Item
              value={item}
              key={item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
            />
          ))}
        </ul>

        {events.length === 0 ? <Empty /> : null}
      </div>
    </div>
  )
}

export default App
