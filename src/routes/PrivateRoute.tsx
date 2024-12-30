import PrivateLayout from "layouts/PrivateLayout";
import { Navigate } from "react-router-dom";

type UserType = {
  username: string;
  email: string;
};

interface PrivateRouteProps {
  user: UserType | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ user }) => {
  return user ? <PrivateLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;