import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p><small>This is required</small></p>;
      case "minLength":
        return <p><small>Value needs to be longer</small></p>;
      case "maxLength":
        return <p><small>Value needs to be shorter</small></p>;
      case "pattern":
        return <p><small>Enter a valid email address</small></p>;
      case "min":
        return <p><small>Value is below minimum value</small></p>;
      case "max":
        return <p><small>Value is above maximum value</small></p>;
      case "validate":
        return <p><small>Username is already used</small></p>;
      default:
        return null;
    }
  }

  return null;
}
