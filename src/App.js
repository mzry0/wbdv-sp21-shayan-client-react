import './App.css';
import CourseManager from "./components/course-manager";
import CourseEditor from "./components/course-editor/course-editor";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home"

function App() {
  return (
      <BrowserRouter>
          <div className="container-fluid">
          <Route path="/" exact={true}  component={Home}/>
          <Route path={["/courses/table", "/courses/grid"]} exact={true} component={CourseManager}/>
          <Route path={[
              "/courses/:layout/edit/:courseId",
              "/courses/:layout/edit/:courseId/:moduleId",
              "/courses/:layout/edit/:courseId/:moduleId/:lessonId",
              "/courses/:layout/edit/:courseId/:moduleId/:lessonId/:topicId"]}
                 exact={true}
                 render={(props) => <CourseEditor {...props}/>}>
          </Route>
          {/*<Route path="/editor" component={CourseEditor}/>*/}
          {/*<Route path="/editor" exact={true} render={(props) => <CourseEditor {...props}/>}/>*/}
        {/*<div className="container-fluid">*/}
        {/*  <CourseManager/>*/}
        {/*  <CourseEditor/>*/}
        {/*</div>*/}
          </div>
      </BrowserRouter>
  );
}

export default App;
