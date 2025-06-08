import React from 'react';
import '../styles/main.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header>
        <div class="container">
        <div id="logo">Smart Water Conservation System</div>
          <nav>
            <ul class="nav-links">
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
            </ul>
          </nav>
       </div>
      </header>
      <main>
        <section>
          <h1>Welcome to the Smart Water Conservation System</h1>
          <p>
            Monitor your water usage, get real-time alerts and recommendations, and contribute
            to a sustainable future.
          </p>
  
          <a href="/login">Get Started</a>
        </section>
        
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Smart Water Conservation System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
