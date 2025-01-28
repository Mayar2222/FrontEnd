import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route index  element={<Layout/>}/>
          <Route path=""  element={<Layout/>}/>

        </Route>
      </Routes>
      </Router>
  );
}

export default App;
