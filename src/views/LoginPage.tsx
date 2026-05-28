import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Lendsqr | Login";
  }, []);

  return (
    <div className="login_wrapper p-(--padding) grid grid-rows-[auto_1fr] gap-(--large-gap) ">
      <figure>
        <img src="/assets/images/lendsqr_logo.png" alt="Lendsqr Logo" />
      </figure>

      <div className="grid lg:grid-cols-[1fr_40%] gap-(--gap)">
        <figure>
          <img src="/assets/images/login_cover.png" alt="login_cover" />
        </figure>

        <div>
          <h1 className="text-2xl font-bold text-(--accent-color) mb-2">
            Welcome!
          </h1>
          <p className="text-gray-600">Enter details to login.</p>

          <form className="mt-10 space-y-4">
            <input
              type="text"
              placeholder="Email"
              className="outline outline-gray-200 w-full rounded-(--radius)"
            />
            <div className="flex justify-between gap-4 items-center pr-4 outline outline-gray-200 ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="w-full rounded-(--radius)"
              />
              <p
                className="text-(--secondary-color) cursor-pointer text-[.8rem]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </p>
            </div>
            <Link
              to="/forgot-password"
              className="text-(--secondary-color) text-[0.8rem] block"
            >
              FORGOT PASSWORD?
            </Link>
            <button
              onClick={() => navigate("/admin/users")}
              className="w-full bg-(--secondary-color) text-white py-2 hover:bg-(--secondary-color-hover) rounded-(--radius)"
              type="button"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
