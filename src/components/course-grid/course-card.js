import React, {useState} from 'react'
import {Link} from "react-router-dom";

const CourseCard = ({course, updateCourse, deleteCourse}) => {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(course.title)

    const saveCourse = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: title
        }
        updateCourse(newCourse)
    }



    return <div className="card" style={{width: "18rem", margin: "15px"}}>
        <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" className="card-img-top"
             alt="..."/>
        <div className="card-body">
            {
                !editing &&
                <h5 className="card-title">
                    <Link to="/editor">
                        {course.title}
                    </Link>
                </h5>
            }
            {
                editing &&
                <input
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}/>
            }
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                the card's content.</p>

            <i onClick={() => deleteCourse(course)} className="fas fa-trash btn mr-1"></i>
            {
                editing &&
                <i onClick={() => saveCourse()} className="fas fa-check btn"></i>
            }

            {
                !editing &&
                <i onClick={() => setEditing(true)} className="fas fa-edit btn"></i>
            }
            <Link to="/editor" className="btn btn-primary float-right">
                Editor
            </Link>
        </div>
    </div>
}

export default CourseCard