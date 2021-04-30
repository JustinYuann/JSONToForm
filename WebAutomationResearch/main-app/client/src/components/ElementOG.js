import React from 'react'
// import bart from './bartsimpson.json'
const Element = (props) => {

    const newObject = object => {
        const clonedObj = { ...object };
        const entries = Object.entries(clonedObj);

        let children = [];
        entries.forEach(([key, value]) => {
          if (typeof value === "object") {
            children.push(
              <div>
                <div class="filter-heading">{value}</div>
                {newObject(value)} 
              </div>

            )
          } else {
            children.push(
              <span key={key}>
                {value}               
              </span>           
            );
          }
        });
        console.log(children)
        return <div>{children}</div>
    }
    // const variable = props.data

    return (
        <div>
            {newObject(props.data)}
            {/* {var umyeah = props.data} */}
            {/* {console.log(props.data)}
            {props.data ? (
                typeof props.data === 'number' ||
                typeof props.data === 'string' ||
                typeof props.data === 'boolean' ? 
                
                console.log("No Children") 
                : console.log({...props.data})
                
                // <Element data = {{...variable }}/>
                


                // <h1>Justin</h1>
            ) : console.log("Maybe")
                  // <h1>Lea</h1>
            } */}
        </div>
    )
}

export default Element
