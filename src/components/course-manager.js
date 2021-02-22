import React from 'react'
import CourseTable from "./course-table";
import CourseGrid from "./course-grid";
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
        // .then(courses => this.setState({courses: courses}))
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
    // alert("delete course " + course._id)
    courseService.deleteCourse(course._id)
        .then(status => {
          // this.setState({
          //   courses: this.state.courses.filter(c => c._id !== course._id)
          // })
          this.setState((prevState) => ({
            courses: prevState.courses.filter(c => c._id !== course._id)
          }))
        })
  }

  addCourse = () => {
    // alert('add course')
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
          {/*<Link to="/">*/}
          {/*    <i className="fas fa-2x fa-home float-right"></i>*/}
          {/*</Link>*/}
        {/*<button onClick={this.addCourse}>*/}
        {/*  Add Course*/}
        {/*</button>*/}

        {/*<Route path="/courses/table" component={CourseTable}/>*/}
        <Route path="/courses/table" exact={true} >
          <CourseTable
              updateCourse={this.updateCourse}
              deleteCourse={this.deleteCourse}
              courses={this.state.courses}/>
        </Route>
        {/*<Route path="/courses/grid" component={CourseGrid}/>*/}
        <Route path="/courses/grid" exact={true} >
          <CourseGrid
              courses={this.state.courses}
              updateCourse={this.updateCourse}
              deleteCourse={this.deleteCourse}/>
        </Route>
        {/*<CourseTable courses={this.state.courses}/>*/}
        {/*<CourseGrid courses={this.state.courses}/>*/}
      </div>
    )
  }
}
// export default CourseManager
