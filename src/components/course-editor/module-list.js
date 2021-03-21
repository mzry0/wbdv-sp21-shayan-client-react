import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import EditableItem from "./editable-item";
import {Link, useParams} from "react-router-dom";
import moduleActions from "../../actions/module-actions";

const ModuleList = (
    {
        myModules=[],
        createModule=() => alert("Create Module 234"),
        deleteModule=(item) => alert("delete " + item._id),
        updateModule,
        findModulesForCourse=(courseId) => console.log(courseId)
    }) => {
    const {courseId, moduleId, layout} = useParams();
    useEffect(() => {
        // alert(courseId)
        findModulesForCourse(courseId)
    }, [])
    return(
        <div>
            <h4 className="mb-3">Modules</h4>
            <ul className="list-group">
                {
                    myModules.map(module =>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/${module._id}`}
                                updateItem={updateModule}
                                deleteItem={deleteModule}
                                active={module._id === moduleId}
                                item={module}
                                listItemType="list-group-item"
                                key={module._id}
                            />
                    )
                }
                <li className="list-group-item">
                    <i onClick={() => createModule(courseId)} className="fas fa-plus fa-2x float-right btn"/>
                </li>
                <Link className="btn btn-danger btn-block" to={`/courses/${layout}`}>
                {/*<a className="btn btn-danger btn-block"*/}
                {/*   onClick={() => history.goBack()}>*/}
                    Cancel
                {/*</a>*/}
                </Link>
            </ul>
        </div>)}

const stpm = (state) => {
    return {
        myModules: state.moduleReducer.modules
    }
}
const dtpm = (dispatch) => {
    return {
        createModule: (courseId) => moduleActions.createModule(dispatch, courseId),
        deleteModule: (item) => moduleActions.deleteModule(dispatch, item),
        updateModule: (module) => moduleActions.updateModule(dispatch, module),
        findModulesForCourse: (courseId) => moduleActions.findModulesForCourse(dispatch, courseId)
    }
}

export default connect(stpm, dtpm)
(ModuleList)