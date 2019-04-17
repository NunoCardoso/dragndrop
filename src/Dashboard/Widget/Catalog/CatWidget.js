import React, { useState, useEffect } from 'react'
import ReactResizeDetector from 'react-resize-detector'

const CatWidget = (props) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted && props.onResize) {
      props.onResize()
      setMounted(true)
    }
  }, [])

  return <div className='c-ui-d-SmileyWidget'>
    <ReactResizeDetector
      handleWidth
      handleHeight
      onResize={props.onResize} />
    <img alt='cat' src={require('../../../resources/images/cat.jpg')} />
  </div>
}

export default CatWidget
