import React from 'react'
import {Link} from "react-router-dom";

const CourseEditor = ({history}) =>
    <div>
          <i className="fas fa-times float-right btn btn-danger fa-2x"
             onClick={() => history.goBack()}></i>
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-4">
                    <h1>
                        Course Editor
                    </h1>
                    <ul className="list-group mt-3">
                        <li className="list-group-item active">
                            Module 1 - JQuery
                            <i className="float-right fa fa-2x fa-times"></i>
                        </li>
                        <li className="list-group-item">
                            Module 2 - React
                            <i className="float-right fa fa-2x fa-times"></i>
                        </li>
                        <li className="list-group-item">
                            Module 3 - Redux
                            <i className="float-right fa fa-2x fa-times"></i>
                        </li>
                        <li className="list-group-item">
                            Module 4 - Native
                            <i className="float-right fa fa-2x fa-times"></i>
                        </li>
                        <li className="list-group-item">
                            Module 5 - Angular
                            <i className="float-right fa fa-2x fa-times"></i>
                        </li>
                        <li className="list-group-item">
                            Module 6 - Node
                            <i className="float-right fa fa-2x fa-times"></i>
                        </li>
                        <li className="list-group-item">
                            Module 7 - Mongo
                            <i className="float-right fa fa-2x fa-times"></i>
                        </li>
                        <li className="list-group-item">
                            <i className="float-right fa fa-2x fa-plus"></i>
                        </li>
                    </ul>


                    <a className="btn btn-danger btn-block"
                       onClick={() => history.goBack()}>
                        Cancel
                    </a>

                </div>
                <div className="col-8">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Build
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Pages
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Theme
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Store
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Settings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">
                                <i className="fa fa-plus"></i>
                            </a>
                        </li>
                    </ul>

                    <br/>

                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Topic 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Topic 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Topic 3</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Topic 4</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

    </div>

export default CourseEditor
