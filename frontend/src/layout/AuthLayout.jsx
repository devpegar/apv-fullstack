import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 sm:mt-10 md:gap-10 lg:mt-0 items-center sm:h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
