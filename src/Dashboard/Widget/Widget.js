import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import WidgetEdit from './WidgetEdit'
import EkspandertBartWidget from './EkspandertBartWidget'
/*import PanelWidget from './PanelWidget'
import SmileyWidget from './SmileyWidget'
import CatWidget from './CatWidget'
*/
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
    let newSizes = {width: width, height: height}
    if (props.onWidgetResize && !props.editMode) {
      let newLayout = _.cloneDeep(props.layout)
      newLayout.h =  Math.ceil((newSizes.height + 50) / props.rowHeight)
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
      return newSizes
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
/*          case 'panel':
            return <PanelWidget {...props}
              onUpdate={onUpdate}/>
          case 'smiley':
            return <SmileyWidget {...props}
              onUpdate={onUpdate}/>
          case 'cat':
            return <CatWidget {...props}
              onUpdate={onUpdate}/>*/
          default:
            return <div>No Widget</div>
        }
      })()
    }
  </div>
}

export default Widget
