import React from "react";

export default function Home({ setGameProperties }) {
  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    setGameProperties({
      col: form["col"].value,
      row: form["row"].value,
      sum: form["sum"].value,
    });
  };
  return (
    <form onSubmit={(event) => onSubmit(event)} id="home_box">
      <label htmlFor="col">column size</label>
      <input type="number" required name="col" id="col" />
      <label htmlFor="row">row size</label>
      <input type="number" required name="row" id="row" />
      <label htmlFor="sum">max sum</label>
      <input type="number" required name="sum" id="sum" />
      <input type="submit" value="start" />
    </form>
  );
}
