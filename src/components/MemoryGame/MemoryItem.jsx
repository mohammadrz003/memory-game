import styles from "./memoryItem.module.css";

const MemoryItem = (props) => {
  const isShowing = props.memoryState.showingItems.find((id) => {
    return id === props.item.id;
  });

  return (
    <div
      onClick={props.onSelectItem}
      className={`${styles.squareButton} flex items-center justify-center text-2xl text-white rounded-md cursor-pointer`}
    >
      {isShowing ? (
        <img className="w-3/5" src={props.item.img} alt="" />
      ) : (
        <img src="/assets/star.svg" className="w-3/5" alt="" />
      )}
    </div>
  );
};

export default MemoryItem;
