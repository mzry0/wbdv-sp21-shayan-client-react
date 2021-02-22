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
        <br/>
        <div className="row">
        {
            courses.map(course =>
                <CourseCard course = {course}
                            key = {course._id}
                            updateCourse={updateCourse}
                            deleteCourse={deleteCourse}/>
            )
        }
        </div>

    </div>

export default CourseGrid
