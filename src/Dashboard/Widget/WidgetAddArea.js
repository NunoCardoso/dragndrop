import React from 'react'
import WidgetAdd from './WidgetAdd'
import './Widget.css'
import WidgetAddPreview from './WidgetAddPreview'

const WidgetAddArea = (props) => {
  return <div className='c-ui-d-widgetAddContainer'>
    <WidgetAddPreview
      currentBreakpoint={props.currentBreakpoint}
     />
    {props.availableWidgets.map(widget => {
      return <WidgetAdd widget={widget} />
    })}
  </div>
}

export default WidgetAddArea
