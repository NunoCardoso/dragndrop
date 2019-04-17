import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import WidgetEdit from './WidgetEdit'
import EkspandertBartWidget from './EkspandertBartWidget'

import './Widget.css'

const Widget = (props) => {

  const [sizes, setSizes] = useState({ lg: {}, md: {}, sm: {}})
  const [mouseOver, setMouseOver] = useState(false)

  useEffect(() => {
    calculateSizes()
  }, [])


  const onUpdate = (update) => {
    props.onWidgetUpdate(update, props.layout)
  }

  const onResize = (width, height) => {
    calculateSizes()
    if (props.onWidgetResize && !props.editMode) {
      let newLayout = _.cloneDeep(props.layout)
      newLayout.h =  Math.ceil((height + 50) / props.rowHeight)
      props.onWidgetResize(newLayout)
    }
  }

  const calculateSizes = () => {
    if (document.getElementById("widget-" + props.layout.i)) {
      const newSizes = {
        width: document.getElementById("widget-" + props.layout.i).offsetWidth,
        height: document.getElementById("widget-" + props.layout.i).offsetHeight
      }
      let oldSizes = _.cloneDeep(sizes)
      if (_.isEmpty(oldSizes[props.currentBreakpoint]) || (
       ( (oldSizes[props.currentBreakpoint].height !== newSizes.height) ||
        (oldSizes[props.currentBreakpoint].width !== newSizes.width) ) ) ) {
        oldSizes[props.currentBreakpoint] = newSizes
        setSizes(oldSizes)
      }
    }
  }

  return <div className='c-ui-d-widget'
    onMouseEnter={() => setMouseOver(true)}
    onMouseLeave={() => setMouseOver(false)}>
    { props.editMode && mouseOver ?
      <WidgetEdit {...props}/> : (function() {
        switch(props.widget.type) {
          case 'ekspandertbart':
            return <EkspandertBartWidget {...props}
              onResize={onResize}
              onUpdate={onUpdate}/>
          default:
            return <div>No Widget</div>
        }
      })()
    }
  </div>
}

export default Widget
