import React from 'react'

const Item = (props) => {
  return (
    <li>
      {props.name}
      {props.children}
    </li>
  )
}

export default Item