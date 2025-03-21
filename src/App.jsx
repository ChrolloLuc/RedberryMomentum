import './App.css'
import AddTask from './Sections/AddTask/AddTask';
import Filter from './Sections/Filter/Filter'
import Navbar from './Sections/Navbar/Navbar'
import Statuses from './Sections/Statuses/Statuses'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Taskpage from './Sections/Taskpage/Taskpage';

function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <>
            <Filter />
            <Statuses />
          </>}/>
         <Route path="create-task" element={<AddTask />} />
         <Route path="/task/:id" element={<Taskpage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
