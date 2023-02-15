import React from 'react';
import { Switch,  } from '@chakra-ui/react'

type propTypes = {
  switchRef: React.RefObject<HTMLInputElement>,
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>,
}

const TemperatureToggler = ({switchRef, setIsChecked}: propTypes)  => {

  const handleToggle = () => {
    if (switchRef.current) {
      setIsChecked(switchRef.current.checked);
    }
  }

  return (
    <>
     <Switch onChange={handleToggle} ref={switchRef} />
    </>
  )
}

export default TemperatureToggler;