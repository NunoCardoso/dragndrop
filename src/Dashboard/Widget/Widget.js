import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import EkspandertBartWidget from './Catalog/EkspandertBartWidget'
import PanelWidget from './Catalog/PanelWidget'
import SmileyWidget from './Catalog/SmileyWidget'
import CatWidget from './Catalog/CatWidget'

const Widget = (props) => {
  
  switch (props.widget.type) {
    case 'ekspandertbart':
      return <EkspandertBartWidget {...props}/>
    case 'panel':
      return <PanelWidget {...props}/>
    case 'smiley':
      return <SmileyWidget {...props}/>
    case 'cat':
      return <CatWidget {...props}/>
    default:
      return <div>No Widget</div>
  }
}

export default Widget
