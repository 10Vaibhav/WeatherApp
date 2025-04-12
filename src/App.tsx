import Layout from './components/layout.';
import './App.css'
import {BrowserRouter} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Layout>
        Hello
      </Layout>
    </BrowserRouter>
  )
}

export default App
