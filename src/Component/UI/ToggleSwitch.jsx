import React, { useState } from 'react'
import { useEffect } from 'react'
import '../../styles/toggleSwitch/toggleSwitch.scss'

export const ToggleSwitch = ({bg, opt, currentOpt, targetTrip}) => {
  const [switchActive, setSwitchActive] = useState(currentOpt)
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    // console.log(currentOpt)
    // console.log('switch' + switchActive)
    setSwitchActive(currentOpt)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOpt])

  // useEffect(() => {
  //   setSwitchActive(optTrip)
  // }, [optTrip])

  const handleSwitch = () => {
    opt(!switchActive, targetTrip)
    setSwitchActive(!switchActive)
  }
  return (
    <div 
      className={`toggle-container ${switchActive ? 'active' : ''}`} 
      style={
        {
          backgroundColor: `${bg}`, 
          width: '1.9rem', 
          height: '1.2rem'
        }
      } 
      onClick={handleSwitch} 
      data-toggle="tooltip" 
      data-placement="left" 
      title="Optimize Trip"
    >
      <div className="toggle-button"></div>
    </div>
  )
}