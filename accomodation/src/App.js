import './App.css';
import {createBrowserRouter, Link ,RouterProvider} from 'react-router-dom'
import Home from './pages/home';
import Search from './pages/search';
import Contact from './pages/contact';
import Upload from './pages/upload';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {path:'/contact',element:<Contact/>},
  {path:'/search',element:<Search/>},
  {path:'/upload',element:<Upload/>}
])

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
