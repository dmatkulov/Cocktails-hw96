import { Route, Routes } from 'react-router-dom';

import { routes } from './utils/constants';

import Layout from './components/UI/Layout/Layout';
import NotFound from './components/UI/NotFound/NotFound';
import RegisterUser from './features/users/containers/RegisterUser';
import LoginUser from './features/users/containers/LoginUser';
import Home from './features/cocktails/Home';
import Recipe from './features/cocktails/Recipe';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={routes.register} element={<RegisterUser />} />
          <Route path={routes.login} element={<LoginUser />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={`${routes.recipes}/:id`} element={<Recipe />} />
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
