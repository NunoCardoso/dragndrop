import React, { useState, useEffect } from 'react'
import ReactResizeDetector from 'react-resize-detector'

const SmileyWidget = (props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted && props.onResize) {
      props.onResize()
      setMounted(true)
    }
  }, [])

  return <div className='m-3 c-ui-d-SmileyWidget text-center'>
    <ReactResizeDetector
      handleWidth
      handleHeight
      onResize={props.onResize} />
    <h4>{props.widget.title}</h4>
    <p style={{
      fontSize: '100px'
    }}><span role='img' aria-label='smiley'>&#128512;</span></p>
  </div>
}

export default SmileyWidget
