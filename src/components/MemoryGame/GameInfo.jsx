import styles from "./gameinfo.module.css"

const GameInfo = (props) => {
  return (
    <div className={`${styles.infoBox} w-full md:w-2/3 lg:w-3/12 text-secondery-100 lg:col-span-3 bg-secondery-300 p-6 rounded-lg`}>
      <h4>
        Pairs matched: <span className="text-primary">{props.matchedItem}</span>
      </h4>
      <h4>
        Total Moves: <span className="text-primary">{props.totalMoves}</span>
      </h4>
    </div>
  );
};

export default GameInfo;
