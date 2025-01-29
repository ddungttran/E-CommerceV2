import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import Footer from "../components/Footer";
import "../assets/global.css";

function Home() {
  return (
    <>
      <div className="container">
        <Slideshow />
      </div>
    </>
  );
}

export default Home;
