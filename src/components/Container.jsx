import { useState, useEffect, useReducer } from "react";
import MemoryItem from "./MemoryItem";
import data from "../data.json";

const initialState = {
  memoryItems: [],
  pairsMatched: 0,
  isMatched: { firstItem: null, secondItem: null },
  totalMoves: 0,
  showingItems: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setMemoryItem": {
      return { ...state, memoryItems: action.value };
    }
    case "selectItem": {
      let cloneState = { ...state };
      const data = action.value;

      if (cloneState.isMatched.firstItem === null) {
        return {
          ...state,
          isMatched: { firstItem: data, secondItem: null },
          showingItems: [...state.showingItems, data.id],
        };
      } else if (
        cloneState.isMatched.firstItem !== null &&
        cloneState.isMatched.secondItem === null
      ) {
        const firstItemObject = cloneState.isMatched.firstItem;
        const match = firstItemObject.value === data.value ? true : false;

        if (firstItemObject.id !== data.id) {
          const isIdInShowingItems = state.showingItems.find((itemId) => {
            return itemId === data.id;
          });
          if (isIdInShowingItems) {
            return state;
          } else if (!isIdInShowingItems && match) {
            return {
              ...state,
              isMatched: {
                firstItem: null,
                secondItem: null,
              },
              totalMoves: cloneState.totalMoves + 1,
              pairsMatched: match
                ? cloneState.pairsMatched + 1
                : cloneState.pairsMatched,
              showingItems: [...state.showingItems, data.id],
            };
          } else if (!isIdInShowingItems && !match) {
            console.log('not match function is running');
            let prevShowingItems = [...state.showingItems];
            let filterShowingItems = prevShowingItems.filter((id) => {
              return state.isMatched.firstItem.id !== id;
            });
            return {
              ...state,
              isMatched: {
                firstItem: null,
                secondItem: null,
              },
              totalMoves: cloneState.totalMoves + 1,
              pairsMatched: match
                ? cloneState.pairsMatched + 1
                : cloneState.pairsMatched,
              showingItems: filterShowingItems,
            };
          }
          return {
            ...state,
            isMatched: {
              firstItem: null,
              secondItem: null,
            },
            totalMoves: cloneState.totalMoves + 1,
            pairsMatched: match
              ? cloneState.pairsMatched + 1
              : cloneState.pairsMatched,
          };
        } else {
          return state;
        }
      }

      return state;
    }

    default:
      return state;
  }
};

const Container = () => {
  const [memoryState, dispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState(false);

  const selectItemHandler = (itemNumber) => {
    console.log(itemNumber);
    dispatch({ type: "selectItem", value: itemNumber });
  };

  useEffect(() => {
    let memoryItemArray = [];
    for (let i = 0; i < 8; i++) {
      let randomNumbers = Math.random();
      memoryItemArray.push({ value: randomNumbers, img: data[i] });
    }

    const duplicateMemoryItem = memoryItemArray.reduce(
      (res, current) => [...res, current, current],
      []
    );

    let cloneMemoryItem = [...duplicateMemoryItem];
    let items = [];
    for (let i = 0; i < duplicateMemoryItem.length; i++) {
      const randomNumber = Math.floor(Math.random() * cloneMemoryItem.length);

      const selectedRandomItem = cloneMemoryItem[randomNumber].value;
      const selectedRandomImage = cloneMemoryItem[randomNumber].img;
      items.push({
        id: Math.random(),
        value: selectedRandomItem,
        img: selectedRandomImage,
      });
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
              key={element.id}
              memoryState={memoryState}
              item={element}
              onSelectItem={() => selectItemHandler(element)}
            />
          );
        })}
      </div>
      <div className="flex justify-between pt-4 text-gray-300">
        <h4>
          Pairs matched:{" "}
          <span className="text-primary">{memoryState.pairsMatched}</span>
        </h4>
        <h4>
          Total Moves:{" "}
          <span className="text-primary">{memoryState.totalMoves}</span>
        </h4>
      </div>
    </div>
  );
};

export default Container;
