import React from 'react'
import _ from 'lodash'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import ReactResizeDetector from 'react-resize-detector'

const EkspandertBartWidget = (props) => {

  const onClick = () => {
    let newWidget = _.cloneDeep(props.widget)
    newWidget.options.collapsed = !newWidget.options.collapsed
    props.onUpdate(newWidget)
  }

  return <Ekspanderbartpanel
    apen={!props.widget.options.collapsed}
    tittel={props.widget.title}
    onClick={onClick}>
    <div>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={props.onResize} />
      {props.widget.options.collapsed === true
        ? null
        : <div dangerouslySetInnerHTML={{__html: props.widget.options.content}}/>
      }
    </div>
  </Ekspanderbartpanel>
}

export default EkspandertBartWidget
