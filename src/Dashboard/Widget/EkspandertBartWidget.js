import React from 'react'
import _ from 'lodash'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import ReactResizeDetector from 'react-resize-detector'

export default class EkspandertBartWidget extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const { onUpdate, widget } = this.props
    let newWidget = _.cloneDeep(widget)
    newWidget.options.collapsed = !newWidget.options.collapsed
    if (onUpdate) {
      onUpdate(newWidget)
    }
  }

  render () {
    const { widget, onResize } = this.props

    return <Ekspanderbartpanel
      apen={!widget.options.collapsed}
      tittel={widget.title}
      onClick={this.onClick}>
      <div>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={onResize} />
        {widget.options.collapsed === true
          ? null
          : <div> Panelet vil da ekspandere og vise innholdet.<br />
        Panelet vil da ekspandere og vise innholdet.<br />
        Panelet vil da ekspandere og vise innholdet.<br />
        Panelet vil da ekspandere og vise innholdet.<br />
        Panelet vil da ekspandere og vise innholdet.<br />
        Panelet vil da ekspandere og vise innholdet.<br />
        Panelet vil da ekspandere og vise innholdet.<br />
        Panelet vil da ekspandere og vise innholdet.<br />
        Panelet vil da ekspandere og vise innholdet.<br />
          </div>}
      </div>
    </Ekspanderbartpanel>
  }
}
