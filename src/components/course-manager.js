import React from 'react'
import CourseTable from "./course-table/course-table";
import CourseGrid from "./course-grid/course-grid";
import CourseEditor from "./course-editor/course-editor";
import {Link, Route} from "react-router-dom";
import courseService from "../services/course-service";

export default class CourseManager
  extends React.Component {
  state = {
    courses: [],
    courseTitleInput: ''
  }

  componentDidMount() {
    courseService.findAllCourses()
        .then(courses => this.setState({courses}))
  }

  updateCourse = (course) => {
    courseService.updateCourse(course._id, course)
        .then(status => {
            this.setState((prevState) => {
                let nextState = {...prevState}
                nextState.courses = prevState.courses.map(c => {
                    if(c._id === course._id) {
                        return course
                    } else {
                        return c
                    }
                })
                return nextState
            })
        })
  }

  deleteCourse = (course) => {
    courseService.deleteCourse(course._id)
        .then(status => {
          this.setState((prevState) => ({
            courses: prevState.courses.filter(c => c._id !== course._id)
          }))
        })
  }

  addCourse = () => {
    const newCourse = {
      title: this.state.courseTitleInput,
      owner: "me",
      lastModified: "2/10/2021"
    }
    // Set title to empty string
    this.setState(() => ({
      courseTitleInput: ''
    }))
    courseService.createCourse(newCourse)
        .then(actualCourse => {
          this.state.courses.push(actualCourse)
          this.setState(this.state)
        })
  }

  render() {
    return(
      <div className="mt-3">
          <div className="row">
              <div className="col-1">
                  <i className="fa fa-bars fa-2x"></i>
              </div>
              <div className="col-2 d-none d-sm-table-cell">
                  <h3>Course Manager</h3>
              </div>
              <div className="col-8">
                  <input className="form-control"
                         placeholder="New Course Title"
                        value={this.state.courseTitleInput}
                         onChange={(e) =>
                             this.setState((prevState) => ({
                                 courses: prevState.courses,
                                 courseTitleInput: e.target.value
                             }))}
                  />
              </div>
              <div className="col-1 ml-auto">
                  <i className="fa fa-plus fa-2x btn float-right" onClick={this.addCourse}></i>
              </div>
          </div>
        <Route path="/courses/table" exact={true} >
          <CourseTable
              updateCourse={this.updateCourse}
              deleteCourse={this.deleteCourse}
              courses={this.state.courses}/>
        </Route>
        <Route path="/courses/grid" exact={true} >
          <CourseGrid
              courses={this.state.courses}
              updateCourse={this.updateCourse}
              deleteCourse={this.deleteCourse}/>
        </Route>
          <Route path={[
              "/courses/editor/:courseId",
              "/courses/editor/:courseId/:moduleId",
              "/courses/editor/:courseId/:moduleId/:lessonId",
              "/courses/editor/:courseId/:moduleId/:lessonId/:topicId"]}
                 exact={true}
                 render={(props) => <CourseEditor {...props}/>}>
          </Route>
          <div className="float-button cursor-pointer" onClick={this.addCourse}>
              <i className="fa fa-plus float-button-icon" ></i></div>
      </div>
    )
  }
}
// export default CourseManager
