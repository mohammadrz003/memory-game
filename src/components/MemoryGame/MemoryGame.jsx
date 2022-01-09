import { useState, useEffect, useReducer } from "react";
import MemoryItem from "./MemoryItem";
import styles from "./memorygame.module.css";
import data from "../../data";
import GameInfo from "./GameInfo";
import GameAction from "./GameAction";

const initialState = {
  memoryItems: [],
  pairsMatched: 0,
  isMatched: { firstItem: null, secondItem: null },
  totalMoves: 0,
  showingItems: [],
  notMatchCallback: false,
  twoLastItemSelectedId: [],
  pending: false,
  resetGame: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setMemoryItem": {
      return { ...state, memoryItems: action.value };
    }
    case "selectItem": {
      if (state.pending) {
        return state;
      }

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
            // show matches item
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
            // in first run we execute this function but after we modify state with another function
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
              notMatchCallback: !state.notMatchCallback,
              twoLastItemSelectedId: [firstItemObject.id, data.id],
              pending: true,
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
    case "cleanNotMatchItem": {
      return { ...state, showingItems: [...action.value], pending: false };
    }
    case "resetGame":
      return { ...initialState, resetGame: !state.resetGame };
    default:
      return state;
  }
};

const MemoryGame = () => {
  const [memoryState, dispatch] = useReducer(reducer, initialState);

  const selectItemHandler = (itemNumber) => {
    dispatch({ type: "selectItem", value: itemNumber });
  };

  useEffect(() => {
    // this function should be run after two second
    // Do not show if two items not match

    if (memoryState.twoLastItemSelectedId.length !== 0) {
      let prevShowingItems = [...memoryState.showingItems];
      let filterShowingItems = prevShowingItems.filter((id) => {
        return !memoryState.twoLastItemSelectedId.includes(id);
      });
      setTimeout(() => {
        dispatch({ type: "cleanNotMatchItem", value: filterShowingItems });
      }, 1000);
    }
  }, [memoryState.notMatchCallback]);

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
  }, [memoryState.resetGame]);

  const resetGameHandler = () => {
    dispatch({ type: "resetGame" });
  };

  return (
    <section className="container mx-auto w-screen min-h-screen flex justify-center items-center">
      <div className="w-full flex flex-col items-center space-y-4">
        {/* <GameInfo
          totalMoves={memoryState.totalMoves}
          matchedItem={memoryState.pairsMatched}
        /> */}

        <div className="flex flex-col items-center text-secondery-100">
          <p>
            Total Moves:{" "}
            <span className="text-primary font-bold">
              {memoryState.totalMoves}
            </span>
          </p>
          <p>
            Pairs Matched:{" "}
            <span className="text-primary font-bold">
              {memoryState.pairsMatched}/8
            </span>
          </p>
        </div>
        <div
          className={`${styles.gameMainBox} w-full md:w-2/3 lg:w-1/3 p-8 rounded-lg`}
        >
          <div className={`${styles.gameGridBox}`}>
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
        </div>
        <GameAction onResetGame={resetGameHandler} />
      </div>
    </section>
  );
};

export default MemoryGame;
