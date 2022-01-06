import { useState, useEffect, useReducer } from "react";
import MemoryItem from "./MemoryItem";

const initialState = {
  memoryItems: [],
  pairsMatched: [],
  totalMoves: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setMemoryItem":
      return { ...state, memoryItems: action.value };
    default:
      return state;
  }
};

const Container = () => {
  const [memoryState, dispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState(false);

  const selectItemHandler = (itemNumber) => {
    console.log(itemNumber);
  };

  useEffect(() => {
    let memoryItemArray = [];
    for (let i = 0; i < 8; i++) {
      let randomNumbers = Math.round(Math.random() * 100);
      memoryItemArray.push(randomNumbers);
    }

    const duplicateMemoryItem = memoryItemArray.reduce(
      (res, current) => [...res, current, current],
      []
    );

    let cloneMemoryItem = [...duplicateMemoryItem];
    let items = [];
    for (let i = 0; i < duplicateMemoryItem.length; i++) {
      const randomNumber = Math.floor(Math.random() * cloneMemoryItem.length);

      const selectedRandomItem = cloneMemoryItem[randomNumber];
      items.push(selectedRandomItem);
      cloneMemoryItem.splice(randomNumber, 1);
    }

    dispatch({ type: "setMemoryItem", value: items });
  }, []);

  return (
    <div className="p-6 mx-auto mt-10 rounded-lg w-fit bg-secondery-200">
      <div className="grid grid-cols-4 grid-rows-4 gap-3">
        {memoryState.memoryItems.map((element, index) => {
          return (
            <MemoryItem
              key={index}
              item={element}
              onSelectItem={() => selectItemHandler(element)}
            />
          );
        })}
      </div>
      <div className="flex justify-between pt-4 text-gray-300">
        <h4>
          Pairs matched: <span className="text-primary">0</span>
        </h4>
        <h4>
          Total Moves: <span className="text-primary">1</span>
        </h4>
      </div>
    </div>
  );
};

export default Container;
