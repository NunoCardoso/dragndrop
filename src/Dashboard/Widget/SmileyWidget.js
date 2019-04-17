import React from 'react'

const SmileyWidget = (props) => {
  return <div className='m-3 c-ui-d-SmileyWidget'>
    <h4>{props.widget.title}</h4>
    <p style={{
      fontSize: '100px'
    }}>&#128512;</p>
  </div>
}

export default SmileyWidget
