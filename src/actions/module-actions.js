import moduleService from "../services/module-service";
export const CREATE_MODULE = "CREATE_MODULE"
export const DELETE_MODULE = "DELETE_MODULE"
export const UPDATE_MODULE = "UPDATE_MODULE"
export const FIND_MODULES_FOR_COURSE = "FIND_MODULES_FOR_COURSE"

const createModule =  (dispatch, courseId) => {
    moduleService.createModuleForCourse(courseId, {title: "New Module"})
        .then(theActualModule => dispatch({
            type: CREATE_MODULE,
            module: theActualModule
        }))
}
const deleteModule = (dispatch, item) =>
    moduleService.deleteModule(item._id)
        .then(status => dispatch({
            type: DELETE_MODULE,
            moduleToDelete: item
        }))

const updateModule = (dispatch, module) =>
    moduleService.updateModule(module._id, module)
        .then(status => dispatch({
            type: UPDATE_MODULE,
            module
        }))

const findModulesForCourse = (dispatch, courseId) => {
    moduleService.findModulesForCourse(courseId)
        .then(theModules => dispatch({
            type: FIND_MODULES_FOR_COURSE,
            modules: theModules
        }))
}

const moduleActions = {
    findModulesForCourse,
    createModule,
    updateModule,
    deleteModule
}
export default moduleActions