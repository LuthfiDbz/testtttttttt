import React, { useState } from 'react'
import { useEffect } from 'react'
import '../../styles/toggleSwitch/toggleSwitch.scss'

export const ToggleSwitchAll = ({bg, opt, currentOpt}) => {
  const [switchActive, setSwitchActive] = useState(currentOpt)

  // useEffect(() => {
  //   opt(switchActive)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [switchActive])

  const handleSwitch = () => {
    opt(!switchActive)
    setSwitchActive(!switchActive)
  }
  return (
    <div className={`toggle-container ${switchActive ? 'active' : ''}`} style={{backgroundColor: `${bg}`}} onClick={handleSwitch}>
      <div className="toggle-button"></div>
    </div>
  )
}