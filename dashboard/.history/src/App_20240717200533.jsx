import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route index  element={<Dashboard/>}/>
          <Route path=""  element={<Layout/>}/>

        </Route>
      </Routes>
      </Router>
  );
}
import Dashboard from "./components/Dashboard";

export default App;
