import React from 'react'
import { Tooltip } from 'react-bootstrap';
import styles from '../styles/Layout.module.scss'

const renderTooltip = props => {
    return (
        <Tooltip id="button-tooltip" {...props}>
          please Check to proceed
        </Tooltip>
      );
}

export default renderTooltip;