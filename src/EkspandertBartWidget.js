import React from 'react'

import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import ReactResizeDetector from 'react-resize-detector';

export default class EkspandertBartWidget extends React.Component {

  render() {
    const {  collapsed, onResize, onCollapse } = this.props

    return <Ekspanderbartpanel
      apen={!collapsed}
      tittel="Klikk her for å åpne/lukke panelet"
      onClick={onCollapse}>
      <div>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={onResize}/>
      {collapsed === true ? null : <div> Panelet vil da ekspandere og vise innholdet.<br/>
        Panelet vil da ekspandere og vise innholdet.<br/>
        Panelet vil da ekspandere og vise innholdet.<br/>
        Panelet vil da ekspandere og vise innholdet.<br/>
        Panelet vil da ekspandere og vise innholdet.<br/>
        Panelet vil da ekspandere og vise innholdet.<br/>
        Panelet vil da ekspandere og vise innholdet.<br/>
        Panelet vil da ekspandere og vise innholdet.<br/>
        Panelet vil da ekspandere og vise innholdet.<br/>
        </div>}
      </div>
    </Ekspanderbartpanel>
  }
}
