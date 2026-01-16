import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

function Home() {
//     State contoller 
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFromData] =useState({
    email:"",
    password:""
  })


//  Handle Login form 
handleSubmit=()=>{
    
}

  return (
    <div className="w-screen h-screen flex bg-amber-400">
      <div className="w-screen md:w-[40vw] bg-fuchsia-700 flex justify-center items-center">
        <div className="w-full h-[70vh] bg-amber-950">
          <form  onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-center items-center gap-4">
            {/* Email field */}
             <div
               className="
               w-[70%] bg-white flex items-center px-4 py-3
               border border-gray-200 rounded-md
               focus-within:border-transparent
               focus-within:ring-0
             "
            >
              <User className="w-5 h-5 text-gray-600" />
              <input
                className="
                 w-full ml-4 h-10
                 outline-none border-none
                 focus:outline-none focus:ring-0
                 bg-transparent
               "
                type="email"
                placeholder="Email"
                onChange={setFromData({...formData ,email:e.target.value})}
              />
            </div>

            {/* Password field */}
            <div
              className="
               w-[70%] bg-white flex items-center px-4 py-3
               border border-gray-200 rounded-md
               focus-within:border-transparent
               focus-within:ring-0
    "
            >
              <Lock className="w-5 h-5 text-gray-600" />
              <input
                className="
               w-full ml-4 h-10
               outline-none border-none
               focus:outline-none focus:ring-0
               bg-transparent
             "
                onChange={setFromData({...formData ,password:e.target.value})}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-[70%] py-3 mt-2 bg-black text-white rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
