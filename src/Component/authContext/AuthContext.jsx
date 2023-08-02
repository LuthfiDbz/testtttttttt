import React, { useState } from 'react';

// Creating the context object and passing the default values.
export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('token') === null ? false : true)
  const [id, setId] = useState('')
  const [userType, setUserType] = useState('')
  const [allProfile, setAllProfile] = useState('')
  const [isPassEmpty, setIsPassEmpty] = useState(1)
  const [tokenFcm, setTokenFcm] = useState('')
  const [apiKey, setApiKey] = useState('')

  const storeUserType = (e) => {
    setUserType(e)
  }

  const storeId = (e) => {
    setId(e)
  }

  const storeProfileData = (e) => {
    setAllProfile(e)
  }

  const storePass = (e) => {
    setIsPassEmpty(e)
  }

  const storeTokenFcm = (e) => {
    setTokenFcm(e)
  }

  const storeApiKey = (e) => {
    setApiKey(e)
  }

  const login = () => {
    setIsLoggedIn(true)
    return
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{
      status: isLoggedIn,
      id,
      userType,
      allProfile,
      tokenFcm,
      isPassEmpty,
      apiKey,
      storeApiKey,
      storePass,
      setAllProfile,
      storeUserType,
      storeId,
      storeProfileData,
      storeTokenFcm,
      setAllProfile,
      login,
      logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}