const ProtectedRoute = ({ isAuth, children, Navigate, publicRedirectPath }) => {
  if (!isAuth) {
    return <Navigate to={publicRedirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
