import React from 'react'
import {Link} from "react-router-dom";
import CourseCard from "./course-card";

const CourseGrid = ({courses, updateCourse, deleteCourse}) =>
    <div className="mt-3 container-fluid">
        <Link to="/courses/table">
            <i className="fas fa-2x fa-list float-right"></i>
        </Link>
        <i className="fas fa-folder float-right fa-2x mr-3"></i>
        <i className="fas fa-sort-alpha-up float-right fa-2x mr-3"></i>
        <div className="row">
        {
            courses.map(course =>
                <CourseCard course = {course}
                            key = {course._id}
                            updateCourse={updateCourse}
                            deleteCourse={deleteCourse}/>
                // <div className="card" style={{width: "18rem", margin: "15px"}}>
                //     <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" className="card-img-top" alt="..."/>
                //     <div className="card-body">
                //         <h5 className="card-title">{course.title}</h5>
                //         <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                //             the card's content.</p>
                //         <Link to="/editor" className="btn btn-primary">
                //             Go somewhere
                //         </Link>
                //     </div>
                // </div>
            )
        }
        </div>

    </div>

export default CourseGrid
