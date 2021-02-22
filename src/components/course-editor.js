import React from 'react'
import {Link} from "react-router-dom";

const CourseEditor = ({history}) =>
  <h1 className="container-fluid mt-3">
      {/*<Link to="/courses/table">*/}
      {/*  <i className="fas fa-arrow-left"></i>*/}
      {/*</Link>*/}
      Course Editor
      <i className="fas fa-times float-right btn fa-2x"
         onClick={() => history.goBack()}></i>
  </h1>

// const CourseEditor = () => {
//   return (
//     <h1>Course Editor</h1>
//   )
// }
export default CourseEditor
