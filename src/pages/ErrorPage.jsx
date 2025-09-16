import { Link } from "react-router";
import ErrorImage from '../assets/error.png'
const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr  from-[#FFE66D] to-[#e77f7f] flex flex-col justify-center items-center text-center px-6">
      {/* Error Illustration */}
      <img
        src={ErrorImage}
        alt="Error Illustration"
        className="w-full max-w-md my-6 rounded-2xl"
      />

      {/* Error Message */}
      <h1 className="text-4xl font-bold text-[#FF6B6B] mb-3">Oops! Page Not Found</h1>
      <p className="text-[#ed4d4d] mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home */}
      <Link
        to="/"
        className="bg-[#FFE66D] text-black px-6 py-3 rounded-lg hover:bg-[#FF6B6B] transition mb-4"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
