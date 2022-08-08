import React, { useEffect, useState } from "react";

export default function Game({ gameProperties }) {
  const [gameMat, setGameMat] = useState(
    Array(parseInt(gameProperties.row)).fill(
      Array(parseInt(gameProperties.col))
    )
  );
  const [message, setMessage] = useState();

  useEffect(() => {
    setGameMat(
      Array(parseInt(gameProperties.row)).fill(
        Array(parseInt(gameProperties.col)).fill(0)
      )
    );
  }, [gameProperties]);

  useEffect(() => {
    let flag = checkCol();
    if (flag) {
      setMessage();
    } else {
      setMessage("invalid");
    }
  }, [gameMat]);

  const updateGameMat = (e, x, y) => {
    var gameMatClone = gameMat.map(function (arr) {
      return arr.slice();
    });
    gameMatClone[y][x] = e.target.value;
    setGameMat(gameMatClone);
  };

  const checkCol = () => {
    for (let i = 0; i < gameProperties.col; i++) {
      let sum = 0;
      for (let j = 0; j < gameProperties.row; j++) {
        sum += parseInt(gameMat[j][i]);
        if (sum > gameProperties.sum) {
          return false;
        }
      }
    }
    return checkRow();
  };

  const checkRow = () => {
    for (let i = 0; i < gameProperties.row; i++) {
      let sum = 0;
      for (let j = 0; j < gameProperties.col; j++) {
        sum += parseInt(gameMat[i][j]);
        if (sum > gameProperties.sum) {
          return false;
        }
      }
    }
    return checkCross();
  };

  const checkCross = () => {
    var gameMatClone = gameMat.map(function (arr) {
      return arr.slice();
    });
    gameMatClone.push(Array(parseInt(gameProperties.col) + 2).fill("a"));
    gameMatClone.unshift(Array(parseInt(gameProperties.col) + 2).fill("a"));
    for (let i = 1; i <= gameProperties.row; i++) {
      gameMatClone[i].push("a");
      gameMatClone[i].unshift("a");
    }
    for (let i = 0; i < gameProperties.row; i++) {
      let j = 0;
      let sumToRight = 0;
      let sumToLeft = 0;
      while (gameMatClone[1 + i + j][1 + j] != "a") {
        sumToRight += parseInt(gameMatClone[1 + i + j][1 + j]);
        sumToLeft += parseInt(gameMatClone[1 + i + j][gameProperties.col - j]);
        if (sumToRight > gameProperties.sum || sumToLeft > gameProperties.sum) {
          return false;
        }
        j++;
      }
    }
    for (let i = 1; i < gameProperties.col - 1; i++) {
      let j = 0;
      let sumToRight = 0;
      let sumToLeft = 0;
      while (gameMatClone[1 + j][1 + j + i] != "a") {
        sumToRight += parseInt(gameMatClone[1 + j][1 + j + i]);
        sumToLeft += parseInt(gameMatClone[1 + j][gameProperties.col - i - j]);
        if (sumToRight > gameProperties.sum || sumToLeft > gameProperties.sum) {
          return false;
        }
        j++;
      }
    }
    return true;
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gameProperties.col}, 40px [col-start])`,
        }}
      >
        {gameMat.map((row, rowIndex) => {
          let inputRow = [];
          for (let i = 0; i < row.length; i++) {
            inputRow.push(
              <input
                onChange={(event) => updateGameMat(event, i, rowIndex)}
                style={{ height: "40px", margin: "3px" }}
                key={`${i}-${rowIndex}-${gameProperties.col}-${gameProperties.row}`}
                type="number"
                name={`${i}-${rowIndex}`}
                id={`${i}-${rowIndex}`}
              />
            );
          }
          return inputRow;
        })}
      </div>
      <p>{message}</p>
    </div>
  );
}
