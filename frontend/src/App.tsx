import { Route, Routes } from 'react-router-dom';

import { routes } from './utils/constants';

import Layout from './components/UI/Layout/Layout';
import NotFound from './components/UI/NotFound/NotFound';
import RegisterUser from './features/users/containers/RegisterUser';
import LoginUser from './features/users/containers/LoginUser';
import Home from './features/cocktails/Home';
import Recipe from './features/cocktails/Recipe';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import Profile from './features/cocktails/Profile';
import NewRecipe from './features/cocktails/NewRecipe';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Layout>
        <Routes>
          <Route path={routes.register} element={<RegisterUser />} />
          <Route path={routes.login} element={<LoginUser />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={`${routes.recipes}/:id`} element={<Recipe />} />
          <Route
            path={routes.userRecipes}
            element={
              <ProtectedRoute isAllowed={user && user.role === 'user'}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.newCocktail}
            element={
              <ProtectedRoute isAllowed={user && user.role === 'user'}>
                <NewRecipe />
              </ProtectedRoute>
            }
          />
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
