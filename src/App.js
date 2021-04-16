import './App.css';
import CourseManager from "./components/course-manager";
import CourseEditor from "./components/course-editor/course-editor";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home"
import OldEditor from "./components/course-editor/course-editor-old"
import QuizzesList from "./components/quizzes/quizzes-list";
import Quiz from "./components/quizzes/quiz";
import QuizAttempts from "./components/quizzes/quiz-attempts";

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
          <Route path="/old-editor" exact={true} component={OldEditor}/>
          <Route path="/courses/:courseId/quizzes" exact={true}>
              <QuizzesList/>
          </Route>
          <Route path="/courses/:courseId/quizzes/:quizId" exact={true}>
              <Quiz/>
          </Route>
          <Route path="/courses/:courseId/quizzes/:quizId/attempts" exact={true} component={QuizAttempts}/>
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
