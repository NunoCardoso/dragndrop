import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import WidgetEdit from './WidgetEdit'
import Widget from './Widget'

import './Widget.css'

const WidgetWrapper = (props) => {
  const [sizes, setSizes] = useState({ lg: {}, md: {}, sm: {} })
  const [mouseOver, setMouseOver] = useState(false)

  useEffect(() => {
    calculateSizes()
  }, [])

  const onUpdate = (update) => {
    props.onWidgetUpdate(update, props.layout)
  }

  const onResize = (width, height) => {
    let newSizes = { width: width, height: height }
    if (props.onWidgetResize && !props.editMode) {
      let newLayout = _.cloneDeep(props.layout)
      newLayout.h = Math.ceil((newSizes.height) / props.rowHeight)
      props.onWidgetResize(newLayout)
    }
  }

  const calculateSizes = () => {
    if (document.getElementById('widget-' + props.layout.i)) {
      const newSizes = {
        width: document.getElementById('widget-' + props.layout.i).offsetWidth,
        height: document.getElementById('widget-' + props.layout.i).offsetHeight
      }
      let oldSizes = _.cloneDeep(sizes)
      if (_.isEmpty(oldSizes[props.currentBreakpoint]) || (
        ((oldSizes[props.currentBreakpoint].height !== newSizes.height) ||
        (oldSizes[props.currentBreakpoint].width !== newSizes.width)))) {
        oldSizes[props.currentBreakpoint] = newSizes
        setSizes(oldSizes)
      }
      return newSizes
    }
  }

  return <div className='c-ui-d-Widget'
    onMouseEnter={() => setMouseOver(true)}
    onMouseLeave={() => setMouseOver(false)}>
    { props.editMode && mouseOver ?
      <WidgetEdit {...props} /> :
      <Widget {...props}
        onUpdate={onUpdate}
        onResize={onResize}
      />
    }
  </div>
}

export default WidgetWrapper
