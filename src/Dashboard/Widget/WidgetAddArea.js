import React from 'react'
import WidgetAdd from './WidgetAdd'
import './Widget.css'

const WidgetAddArea = (props) => {
  return <div className='c-ui-d-widgetAddContainer'>
    {props.availableWidgets.map(widget => {
      return <WidgetAdd widget={widget} />
    })}
  </div>
}

export default WidgetAddArea
