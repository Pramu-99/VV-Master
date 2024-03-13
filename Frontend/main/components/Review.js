import { FaStar } from "react-icons/fa";
import { useState } from "react";
import React from "react";

const colors = {
    orange: "#FFBA5A",
    grey: "#a2a2a2",
    lightGreen: "#afdd37",
    lightPink: "#f3f1ff",
  };
function Review(){
    const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = React.useState(0);
  const [hoverValue, setHoverValue] = React.useState(undefined);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = (value) => {
    setHoverValue(undefined);
  };

  return (
    <div style={styles.container}>
      <h2>REVIEW</h2>
      <select style={styles.boxBack}>
        <option>Name:Role</option>
      </select>
      <h2>Rate Us</h2>
      <div style={StyleSheet.stars}>
        {stars.map((_key, index) => {
          return (
            <FaStar
              key={index}
              size={20}
              styles={{
                marginRight: 10,
                cursor: "hand",
              }}
              color={
                (hoverValue || currentValue) > index &&
                (currentValue > 2 || hoverValue > 2)
                  ? colors.lightGreen
                  : (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              //onMouseMove={console.log(hoverValue, currentValue, index)}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
      <textarea
        placeholder="Review Here"
        style={Object.assign({}, styles.textarea, styles.boxBack)}
      />
      <br />
      <button style={styles.button}>Post</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#FFF",
    border: "1px solid black",
    borderRadius: 15,
    Height: "1200px",
    width: "350px",
    padding: "50px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "flexStart",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    margin: "20px 0",
    minHeight: 100,
    padding: 10,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    backgroundImage: "linear-gradient(#dddc68, #67d965)",
    width: 100,
    padding: 10,
  },
  boxBack: {
    backgroundColor: colors.lightPink,
    padding: 10,
    border: "1px solid purple",
    borderRadius: 5,
  },

};
export default Review;