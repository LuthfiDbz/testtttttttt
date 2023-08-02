import React from "react";
import {Spinner} from "reactstrap"

export const LoadingScreen = () => {
  return (
    <div 
      className="loading-screen"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        opacity: 0.3,
        top: 0,
        left:0,
        zIndex: 99999,
        position: 'fixed',
        cursor: 'wait'
      }}  
    ></div>
  )
}

export const LoadingScreenDyn = ({widht, height}) => {
  return (
    <div 
      className="loading-screen"
      style={{
        width: widht,
        height: height,
        backgroundColor: 'black',
        opacity: 0.3,
        top: 0,
        left:0,
        zIndex: 99999,
        position: 'fixed',
        cursor: 'wait'
      }}  
    ></div>
  )
}

export const LoadingScreenSpinner = () => {
  return (
    <div 
      className="loading-spinner" 
      style={{
        width: "100%",
        textAlign: "center"
      }}
    >
      <Spinner >Loading...</Spinner>
    </div>
  )
}

export const LoadingScreenSkeleton = () => {
  return (
    <div className="loading-skeleton">
      
    </div>
  )
}