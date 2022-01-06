const MemoryItem = (props) => {
  return (
    <div
      onClick={props.onSelectItem}
      className="flex items-center justify-center text-2xl text-white rounded-md cursor-pointer w-28 h-28 bg-secondery-100"
    >
      {props.item}
    </div>
  );
};

export default MemoryItem;
