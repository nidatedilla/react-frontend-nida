import PrivateRoute from 'routes/PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import Login from 'features/auth/Login';
import Register from 'features/auth/Register';
import ForgotPassword from 'features/auth/ForgotPassword';
import ResetPassword from 'features/auth/ResetPassword';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import Status from 'pages/Status';
import Search from 'pages/Search';
import Follow from 'pages/Follow';
import { UserProvider } from 'hooks/contexts/UserContexts';
import useUserStore from 'store/UserStore';
import GlobalSpinner from 'components/ui/global-spinner';

export default function App() {
  const { user } = useUserStore();

  return (
    <div>
      <UserProvider>
        <GlobalSpinner />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route element={<PrivateRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/status/:id" element={<Status />} />
            <Route path="/search" element={<Search />} />
            <Route path="/follow" element={<Follow />} />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}
