import { Link } from "react-router-dom";

const GameAction = (props) => {
  return (
    <div className="w-full md:w-2/3 lg:w-3/12 text-white space-x-5 flex items-center">
      <Link to="/">
        <img className="w-20" src="/assets/home.svg" alt="" />
      </Link>
      <button onClick={props.onResetGame}>
        <img className="w-20" src="/assets/repeat.svg" alt="" />
      </button>
      <button>
        <img className="w-20" src="/assets/soundon.svg" alt="" />
      </button>
      <button>
        <img className="w-20" src="/assets/soundoff.svg" alt="" />
      </button>
    </div>
  );
};

export default GameAction;
