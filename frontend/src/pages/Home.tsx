import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import RegisterForm from "../features/auth/components/RegisterForm";
import LoginForm from "../features/auth/components/LoginForm";
import { useAuth } from "../features/auth/context/authContext";
import { useNavigate } from "react-router-dom";

function Home() {
  PageTitle("Webler Codes", false);
  const { userInfo } = useAuth();
  const [isRegisterForm, toggleForm] = useState(true);
  const navigate = useNavigate();

  // Generate particles
  const [particles, setParticles] = useState<number[]>([]);
  useEffect(() => {
    setParticles(Array.from({ length: 80 }, (_, i) => i));
  }, []);

  return (
    <main>
      {/* Banner */}
      <div className="wb-banner">
        <div className="particles">
          {particles.map((p) => (
            <div key={p} className="particle" style={{ left: `${Math.random() * 100}%`, animationDuration: `${5 + Math.random() * 10}s` }}></div>
          ))}
        </div>
          <div className="wb-banner__content">
            <div className="wb-banner__logo">
              <img className="wb-banner__logo__img" src="https://i.ibb.co/TqMYX9QQ/wblogocorrection.png" alt="logo" />
            </div>
            <h1 className="wb-banner__text">Software Engineering</h1>
            <hr />
            <p className="wb-banner__slogan">-Building the future, one code at a time</p>
          </div>

            {/* Maximus image + duplicate behind */}
          <div className="wb-image-wrappers">
             <a href="https://www.weblercodes.com/Compiler-Playground/68cb67d00ca13b2e001a0f66" target="_blank" className="banner-img-wrapper">
              <img className="wb-banner__maximus__img spread duplicate" src="https://i.ibb.co/q3JmHSHX/IMG-8870.jpg" alt="maximus bombasticus" />
              <img className="wb-banner__maximus__img spread" src="https://i.ibb.co/q3JmHSHX/IMG-8870.jpg" alt="maximus bombasticus" />
            </a>

            {/* Gemoku image + duplicate behind */}
            <a href="https://www.weblercodes.com/Compiler-Playground/68ca697f0ca13b2e0019f5d4" target="_blank" className="banner-img-wrapper">
              <img className="wb-banner__gemoku__img spread duplicate" src="https://i.ibb.co/20TMCWP8/IMG-8871.jpg" alt="gemoku ttt" />
              <img className="wb-banner__gemoku__img spread" src="https://i.ibb.co/20TMCWP8/IMG-8871.jpg" alt="gemoku ttt" />
            </a>

            {/* Memory image + duplicate behind */}
            <a href="https://www.weblercodes.com/Compiler-Playground/68c497d092e463503d8d413f" target="_blank" className="banner-img-wrapper">
              <img className="wb-banner__memory__img spread duplicate" src="https://i.ibb.co/kgdBzbpk/IMG-8872.jpg" alt="memory leak" />
              <img className="wb-banner__memory__img spread" src="https://i.ibb.co/kgdBzbpk/IMG-8872.jpg" alt="memory leak" />
            </a>

            {/* Grotto image + duplicate behind */}
            <a href="https://www.weblercodes.com/Compiler-Playground/68c4967f92e463503d8d40f1" target="_blank" className="banner-img-wrapper">
              <img className="wb-banner__grotto__img spread duplicate" src="https://i.ibb.co/RpdFBSx4/IMG-8873.jpg" alt="grotto escape" />
              <img className="wb-banner__grotto__img spread" src="https://i.ibb.co/RpdFBSx4/IMG-8873.jpg" alt="grotto escape" />
            </a>

            {/* Memory image + duplicate behind */}
            <a href="https://www.weblercodes.com/Compiler-Playground/68c3c77192e463503d8cf8c2" target="_blank" className="banner-img-wrapper">
              <img className="wb-banner__quiz__img spread duplicate" src="https://i.ibb.co/tTSt9bHR/IMG-8876.jpg" alt="quiz" />
              <img className="wb-banner__quiz__img spread" src="https://i.ibb.co/tTSt9bHR/IMG-8876.jpg" alt="quiz" />
            </a>

            <a href="https://www.weblercodes.com/Compiler-Playground/68b7d2c2486619aaa9bb9938" target="_blank" className="banner-img-wrapper">
              <img className="wb-banner__code__img spread duplicate" src="https://i.ibb.co/bj1y1NLQ/IMG-8875.jpg" alt="code" />
              <img className="wb-banner__code__img spread" src="https://i.ibb.co/bj1y1NLQ/IMG-8875.jpg" alt="code" />
            </a>

          </div>
           
      </div>

      {/* Info Section */}
      <section className="wb-home-content">
        <h2 className="wb-home-section-title">Explore Features</h2>
        <div className="wb-home-cards">
          <div className="wb-home-card">
            <h3 className="wb-home-card-title">Playground</h3>
            <p className="wb-home-card-text">Create, edit, and run code in multiple programming languages — all within your browser. Our web-based IDE is perfect for testing ideas, learning syntax, or building small projects without any setup.</p>
            <Link to="/Codes" className="wb-home-card-button">Go to Playground</Link>
          </div>
          <div className="wb-home-card">
            <h3 className="wb-home-card-title">Community Feed</h3>
            <p className="wb-home-card-text">Stay connected with the Webler community! The Feed lets you see the latest project updates, shared snippets, discussions, and highlights from developers around the world.</p>
            <Link to="/Feed" className="wb-home-card-button">Check Feed</Link>
          </div>
          <div className="wb-home-card">
            <h3 className="wb-home-card-title">Courses</h3>
            <p className="wb-home-card-text">Learn by doing with our interactive courses! Each one includes hands-on content, quizzes, and coding tasks to help you master web technologies, programming languages, and software tools at your own pace.</p>
            <Link to="/Courses" className="wb-home-card-button">Explore Courses</Link>
          </div>
          <div className="wb-home-card">
            <h3 className="wb-home-card-title">Q&A Forum</h3>
            <p className="wb-home-card-text">Have a question about code or tech? Join our community-driven forum to ask, answer, and explore real-world programming problems. It’s a place to learn, share knowledge, and grow together.</p>
            <Link to="/Discuss" className="wb-home-card-button">Visit Forum</Link>
          </div>
        </div>

        {/* Join Us */}
        {!userInfo && (
          <div className="wb-home-sign-up">
            <div className="wb-home-sign-up-form">
              {isRegisterForm ? 
                <RegisterForm onRegister={() => navigate("/Profile")} onToggleClick={() => toggleForm(false)} /> :
                <LoginForm onLogin={() => navigate("/Profile")} onToggleClick={() => toggleForm(true)} />
              }
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
