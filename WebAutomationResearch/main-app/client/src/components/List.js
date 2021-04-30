import React from 'react'
import Item from './Item.js'

const MyComponent  = (props) => {
    if(Array.isArray(props.collection)) {
        return <ul>
              {props.collection.map((data)=> {
                  return <li>
                     <ul>
                       <li>{data.title}</li>
                       <li>{data.slug}</li>
                       <li><MyComponent collection={data.children}/></li>
                     </ul>
                  </li>
              })
              }
        </ul>
    }
    console.log()
    return null;
}
export default MyComponent;