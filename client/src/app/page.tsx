"use client"
import "@/Components/Styles/Home.css";
import { useRouter } from "next/navigation";
const Home = () => {

  const router=useRouter();
  return (
    <div className="home-main">
    <div className="home-container">
      {/* Text Content */}
      <div className="home-content">
        <h1 className="main-heading">Hello <span className="brand">from CheckFlow</span></h1>
        <h2 className="sub-heading">Enhance your productivity</h2>
        <p className="description">
          The platform that boosts your daily activities using a powerful to-do list system.
          Join many successful people who already use CheckFlow to manage their day effectively!
        </p>
         <button className="cta-button" onClick={()=>router.push('/AllTask')}>Let’s Get Started╰┈➤</button>
      </div>
      {/* Image */}
      <div className="home-image">
        <img src="/img1.jpg" alt="CheckFlow Preview" />
      </div>  
    </div>
     </div>
  );
};

export default Home;
