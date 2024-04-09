import React from 'react'
// props: { index, label, resource }
export const ResourceHeader = ({ index, label, resource }) => {
  console.log(index, label, resource)
  return (
    <div>{label}</div>
  )
}
