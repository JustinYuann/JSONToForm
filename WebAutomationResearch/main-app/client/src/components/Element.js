import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios"
import "./styles.css"
import { useEffect,useState } from 'react';
import ErrorMessage from "./errorMessage";
import { isFuture } from 'date-fns';

const Element = (data) => { 

  /**
   * This look up table allows me to check if an object is a
   * declared data entry or is holding another object
   */
  var validationLookUpTable = {
    "type": true,
    "value": true,
    "required": true,
    "max": true,
    "min": true,
    "minLength": true,
    "maxLength": true,
  };


  const { register, handleSubmit, errors} = useForm({
    mode: "onBlur",
    criteriaMode: 'all'
  });
  const onSubmit = data => console.log(data);

  const [initialState, setInitialState] = useState([])

  /**
   * Communicates to the Express server to retrieve the JSON data
   */
  const componentDidMount = () => {
    axios.all([
      axios.get('/typed.json')
    ])
    .then(axios.spread((obj2) => {
      setInitialState(obj2.data)
    }));
  }
  
/**
 * 
 * @param {object} p p is an object that I want to know the instance of
 * @returns returns what instance the passes parameter is
 */
  function getType(p) {
    if (Array.isArray(p)) return 'array';
    //Checks if p is an arrau
    else if (typeof p == 'string') return 'string';
    //Checks if p is typeOf String
    else if (p != null && typeof p == 'object') return 'object';
    //Checks if p is typeOf Object
    else return 'other';
  }

  /**Takes in a value and returns an Option Component used for the Select Component
  */
  function dropdownPaser(p){
    var value = p;
    return <option value = {value}>{value}</option>
  }

  //This function will take in what type has been declared and return the applicable field
  function identififyType(field,key){
    var isFieldRequired = false;
    var minAttribute;
    var maxAttribute;
    var valueAttribute;
    var typeAttribute;
    var maxLengthAttribute;
    var minLengthAttribute;


    for (const [key, value] of Object.entries(field)) {
      if (key === "required"){
        isFieldRequired = true;
      } else if (key === "max"){
        maxAttribute = value
      } else if (key === "min"){
        minAttribute = value
      } else if (key === "value"){
        valueAttribute = value;
      } else if (key === "type"){
        typeAttribute = value;
      } else if (key === "maxLength"){
        maxLengthAttribute = value
      } else if (key === "minLength"){
        minLengthAttribute = value
      }
    }
  
    if (typeAttribute === "date"){
      return <>
      <input
      name = {key}
      type = "datetime-local"
      ref = {register({
        required: isFieldRequired})}
      />
      <ErrorMessage error={errors?.[key]} />
      </>

    } else if (typeAttribute === "select"){
      /**
       * - Select is for Yes or No fields
       */
      return <div>
          <select 
            name = {key} 
            ref={register({
            required: isFieldRequired
          })}>
            <option value="">Select...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
      </select>
      <ErrorMessage error={errors?.[key]} />
      </div>

    } else if (typeAttribute === "entryBox"){
      /**
       * entryBox is for fields that are require extensive writing 
       * for example medical conditions
       */
      return <div>
        <textarea
        name = {key} 
        ref = {register({
          required: isFieldRequired,
          minLength: 1,
          max: 1
        })}
        />
        <ErrorMessage error={errors?.[key]} />
        </div>

    } else if (typeAttribute === "dropdown"){
      /**
       * dropdown is for fields that have one or more options
       * for example, titles
       */
      return <>
      <select 
          name = {key}
          ref={register({
            required: isFieldRequired
          })}
          >
            <option value="">Select...</option>
            {valueAttribute.map(dropdownPaser)}
          </select>
          <ErrorMessage error={errors?.[key]} />
      </>

      
    } else if (typeAttribute === "numberRange"){
      /**
       * numberRange is for fields that use numners
       * for example, age
       * you can add validation for max and min values
       */
      return <><input
      name = {key}
      type = "number"
      ref = {register({
        required: isFieldRequired,
        min: minAttribute,
        max: maxAttribute
      })}
      />

      <input
      name = "age"
      type = "number"
      ref = {register({
        required: true,
        min: 18,
        max: 100
      })}
      />


      <ErrorMessage error={errors?.age}/>
      </>
      
    } else if (typeAttribute === "email"){
      /**
       * email is for fields that require entry of an email
       * an email pattern will be cross referenced 
       * there is no way to stop this functionality
       */
      return <>
      <input
      name = {key}
      ref = {register({
        required: isFieldRequired,
        pattern: /^\S+@\S+$/i 
      })}
      />
      <ErrorMessage error={errors?.[key]}  />
      </>
    }
    else {
      /**
       * this field is for those that dont have specific purpose but 
       * still want to add some sort of validation
       */
      return <>
      <input
      name = {key}
      ref = {register({
        required: isFieldRequired,
        max: maxAttribute,
        min: minAttribute,
        maxLength: maxLengthAttribute,
        minLength: minLengthAttribute

      })}
      />
      <ErrorMessage error={errors?.[key]}  />
      </>
    }
  }
  
  /**
   * 
   * @param {String Value Pair} object is a string value pair that is being checked if its an object or an array
   * @returns will return the HTML elements of the chosen JSON
   */
  const recursiveParser = object => { 
      const entries = Object.entries({ ...object });
    //This takes all the JSON data past the first element of an Object
    //This is because the first value is usually the title/header of the JSON
    //For example if the JSON held employees, it would skip Employee []
      let children = [];
    //This is where all the HTML elements will be added before being rendered
    //It allows for all the elements to be rendered at once instead of one at a time
      entries.forEach(([key, value]) => {
      //For each String Value Pair take the Key and the Value
          if (getType(value) === "object") {
            //If Value is an Object
            var firstKey = (([Object.keys(value)[0]])[0])
            //Get the first value inside the object

            if (!validationLookUpTable[firstKey]){
              //If the object is not a specialised data type
              children.push(
                <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                  <label>{key}</label>
                  {recursiveParser(value)}
                </div>
              )
            } else {
              // If the object is a specialised data type
              children.push(
                <div>
                  <label>{key}</label>
                  {identififyType(value,key)}
                </div>
              )
            }

          } else if (getType(value) === "array") {
            // If it's an array go deeper inside
            children.push(
              <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
                <label>{key}</label>
                {recursiveParser(value)}
              </div>
            )
          }
         else {
          //  If it's an ordinary String Value Pair holding real data
            children.push(
              <>
                <label>{key}</label>
                <input name = {key} ref = {register}/>
                <label></label>
              </>
            )
        }
      });
      return <div>{children}</div>
  }

  return (
      <>
        {componentDidMount()}
        {/* Obtain JSON data from server */}
        <form onSubmit = {handleSubmit(onSubmit)}>
          {recursiveParser(initialState)} 
          {/* intialState is the JSON data */}
          <input type = "submit" />
        </form>
      </>
  )
}


export default Element