import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";

export default class CourseTable extends
  React.Component {

    constructor(props) {
        super(props);
    }

  render() {
    return(
      <div className="mt-3">
        {/*<h2>Course Table</h2>*/}
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Title</th>
                    <th className="d-none d-sm-table-cell">Owned by</th>
                    <th className="d-none d-sm-table-cell">Last modified</th>
                    <th>
                        <Link to="/courses/grid">
                            <i className="fas fa-th float-right fa-2x"></i>
                        </Link>
                        <i className="fas fa-sort-alpha-up float-right fa-2x mr-3"></i>
                        <i className="fas fa-folder float-right fa-2x mr-3"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
              {/*<CourseRow title="CS5610" owner="me"/>*/}
              {/*<CourseRow title="CS3200" owner="you"/>*/}
              {/*<CourseRow title="CS5200" owner="him"/>*/}
              {/*<CourseRow title="CS4550" owner="she"/>*/}
              {
                this.props.courses.map(course =>
                  <CourseRow
                    key={course._id}
                    deleteCourse={this.props.deleteCourse}
                    updateCourse={this.props.updateCourse}
                    course={course}
                    title={course.title}
                    lastModified={course.lastModified}
                    owner={course.owner}/>)
              }
            </tbody>
        </table>
      </div>
    )
  }
}
