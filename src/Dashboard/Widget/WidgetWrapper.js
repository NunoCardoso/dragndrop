import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import WidgetEdit from './WidgetEdit'
import Widget from './Widget'

import './Widget.css'

const WidgetWrapper = (props) => {
  const [sizes, setSizes] = useState({ lg: {}, md: {}, sm: {} })
  const [mouseOver, setMouseOver] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      calculateSizes()
      setMounted(true)
    }
  }, [])

  const onUpdate = (update) => {
    props.onWidgetUpdate(update, props.layout)
  }

  const onResize = (width, height) => {
    if (!height || !width) { return }
    if (props.onWidgetResize && !props.editMode) {
      let newLayout = _.cloneDeep(props.layout)
      // these 10 are padding/margin added to each h
      newLayout.h = Math.ceil((height + 10) / (props.rowHeight + 10))
      props.onWidgetResize(newLayout)
    }
  }

  const getSizes = () => {
    return {
      width: document.getElementById('widget-' + props.layout.i).offsetWidth,
      height: document.getElementById('widget-' + props.layout.i).offsetHeight
    }
  }

  const calculateSizes = () => {
    if (document.getElementById('widget-' + props.layout.i)) {
      const newSizes = getSizes()
      let oldSizes = _.cloneDeep(sizes)
      if (_.isEmpty(oldSizes[props.currentBreakpoint]) || (
        ((oldSizes[props.currentBreakpoint].height !== newSizes.height) ||
        (oldSizes[props.currentBreakpoint].width !== newSizes.width)))) {
        oldSizes[props.currentBreakpoint] = newSizes
        setSizes(oldSizes)
      }
    }
  }

  return <div className='c-ui-d-Widget'
    onMouseEnter={() => setMouseOver(true)}
    onMouseLeave={() => setMouseOver(false)}>
    { props.editMode && mouseOver
      ? <WidgetEdit {...props} />
      : <Widget {...props}
        onUpdate={onUpdate}
        onResize={onResize}
      />
    }
  </div>
}

export default WidgetWrapper
