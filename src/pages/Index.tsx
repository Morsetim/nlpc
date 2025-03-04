import { useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate();


    const loginNavigation = () => {
      navigate('/login');
    }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#28a745]">NLPC PENSION</h1>
        <p className="text-xl text-gray-800">Start Saving for the future with NLPC Pension</p>
        <p className="text-xl underline text-[#28a745] font-bold cursor-pointer" onClick={loginNavigation}>Sign In</p>
      </div>
    </div>
  );
};

export default Index;
