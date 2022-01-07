import styles from "./home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="w-screen min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-center text-white text-7xl mb-7">Memory Game</h1>
      <p className="text-center text-[#EEEEEE] mb-14 text-lg font-semibold">
        Click on the play game button to start the game, I hope you enjoy the
        game
      </p>
      <Link
        to="play"
        className={`${styles.button} text-center font-bold tracking-wider text-[#EEEEEE] py-5`}
      >
        PLAY GAME
      </Link>
    </section>
  );
};

export default Home;
