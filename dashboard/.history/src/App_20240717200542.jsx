import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<La/>}>
          <Route index  element={<Dashboard/>}/>
          <Route path=""  element={<Layout/>}/>

        </Route>
      </Routes>
      </Router>
  );
}

export default App;
