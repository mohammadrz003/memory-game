const MemoryItem = (props) => {
  const isShowing = props.memoryState.showingItems.find((id) => {
    return id === props.item.id;
  });

  return (
    <div
      onClick={props.onSelectItem}
      className="flex items-center justify-center text-2xl text-white rounded-md cursor-pointer w-28 h-28 bg-secondery-100"
    >
      {/* {props.item.value.toFixed(4)} */}
      {isShowing ? <img className="w-3/5" src={props.item.img} alt="" /> : <h3 className="text-white text-base">Not Selected</h3>}
      
    </div>
  );
};

export default MemoryItem;
