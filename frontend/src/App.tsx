import Layout from './components/UI/Layout/Layout';
import NotFound from './components/UI/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<h2> App will be here</h2>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
