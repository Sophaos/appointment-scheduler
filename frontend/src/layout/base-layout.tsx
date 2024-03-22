import React from 'react'
import { BaseToolbar } from './base-toolbar'

export const BaseLayout = ({children}) => {
  return (
    <>
      <BaseToolbar />
      {children}
    </>
  )
}
