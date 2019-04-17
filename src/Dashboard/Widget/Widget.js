import React from 'react'

import EkspandertBartWidget from './Catalog/EkspandertBartWidget'
import PanelWidget from './Catalog/PanelWidget'
import SmileyWidget from './Catalog/SmileyWidget'
import CatWidget from './Catalog/CatWidget'

const Widget = (props) => {
  switch (props.widget.type) {
    case 'ekspandertbart':
      return <EkspandertBartWidget {...props} />
    case 'panel':
      return <PanelWidget {...props} />
    case 'smiley':
      return <SmileyWidget {...props} />
    case 'cat':
      return <CatWidget {...props} />
    default:
      return <div>No Widget of type {props.widget.type}</div>
  }
}

export default Widget
