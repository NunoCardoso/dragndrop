import React, { useState } from 'react'
import KnappBase from 'nav-frontend-knapper';
import './Widget.css'

const WidgetEdit = (props) => {

  const [deleteMode, setDeleteMode] = useState(false)

  const onWidgetEditClick = (e) => {
    console.log(e)
  }

  const onWidgetDeleteClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    props.onWidgetDelete(props.layout)
  }

  if (deleteMode) {
    return <div className='c-ui-d-WidgetDelete'>
      <div classname='p-4 text'>
        <p>Are you sure you want to remove this widget?</p>
        <p>You can add it later, but all settings/configurations will be lost.</p>
      </div>
      <div className='buttons'>
        <KnappBase
          type='hoved'
          onClick={onWidgetDeleteClick}
        >Yes, delete</KnappBase>
        <KnappBase
          type='flat'
          onClick={() => setDeleteMode(false)}
        >No, cancel</KnappBase>
      </div>
    </div>
  }

  return <div className='c-ui-d-WidgetEdit'
    onClick={onWidgetEditClick}>
    <div className='titleDiv draggableHandle'>
      <span className='title'>Editing</span>
      <span className='deleteButton'>
        <a href='#' onClick={() => setDeleteMode(true)}>[X]</a>
      </span>
    </div>
  </div>
}

export default WidgetEdit