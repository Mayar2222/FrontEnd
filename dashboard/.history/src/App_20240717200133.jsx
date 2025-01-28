import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route path=""  element={<Layout/>}/>
          <Route path=""  element={<Layout/>}/>

        </Route>
      </Routes>
      </Router>
  );
}

export default App;
