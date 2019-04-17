import React from 'react'
import PanelBase from 'nav-frontend-paneler'

const PanelWidget = (props) => {
  return <div className='c-ui-d-PanelWidget m-3'>
    <h4>{props.widget.title}</h4>
    <PanelBase border>
      <div dangerouslySetInnerHTML={{ __html: props.widget.options.content }} />
    </PanelBase>
  </div>
}

export default PanelWidget
