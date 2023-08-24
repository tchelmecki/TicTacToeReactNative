import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Main = () => {
  const [elements, setElements] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [winner, setWinner] = useState(null); 
  const [isDraw, setIsDraw] = useState("");
  const [xFirst, setxFirst] = useState(false);

  const PanelClick = (index) => {
    if (!winner && elements[index] === null) {
      const updatedElements = [...elements];
      updatedElements[index] = player ? "X" : "O";
      setElements(updatedElements);
      setPlayer(!player);
      if (!xFirst) {
        setxFirst(true);
      }
    }
  };

  useEffect(() => {
    const checkWinner = () => {
      let isBoardFull = true;
      for (const element of elements) {
        if (element === null) {
          isBoardFull = false;
          break;
        }
      }
    
      if (isBoardFull && winner === null) {
        console.log("Remis!");
        setIsDraw("TIE!");
      }
    
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    
      for (const line of lines) {
        const [a, b, c] = line;
        if (
          elements[a] &&
          elements[a] === elements[b] &&
          elements[a] === elements[c]
        ) {
          console.log(`${elements[a]} wygrał!`);
          setWinner(line);
          setIsDraw(`${elements[a]} won!`);
          break;
        }
      }
    };

    checkWinner();
  }, [elements]);

  const Reset = () => {
    setElements(Array(9).fill(null));
    setPlayer(true);
    setWinner(null);
    setIsDraw("");
    setxFirst(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.result}><Text style={styles.textResult}>{xFirst ? null : (
      <Text style={styles.textResult}>X starts</Text>
      )}{isDraw}</Text>
      </View>
      <View style={styles.content}>
        {elements.map((element, index) => (
          <TouchableHighlight
            style={[
              styles.tile,
              winner && winner.includes(index) && styles.winnerTile,
              isDraw === "TIE!" && styles.drawTile,
              (index === 1 || index === 4 || index === 7) && styles.middleTile,
              (index === 6 || index === 7 || index === 8) && styles.nonBorderTile
            ]}
            key={index}
            onPress={() => PanelClick(index)}
          >
            <Text style={styles.text}>{element}</Text>
          </TouchableHighlight>
        ))}
      </View>
      <TouchableOpacity style={styles.buttonReset} onPress={Reset}>
        <Text style={styles.buttonResetTitle}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  tile: {
    borderBottomWidth: 5,
    borderColor: "#fff",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  nonBorderTile:{
    borderBottomWidth:0,
  },
  middleTile:{
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  winnerTile: {
    backgroundColor: "green",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  textResult:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  content: {
    width: 250,
    flexWrap: "wrap",
    backgroundColor: "black",
    flexDirection: "row",
    borderWidth: 5,
    borderColor: "#fff",
    borderRadius: 3,
  },
  buttonReset:{
        height: 50,
        width: 80,
        marginTop: 30,
        backgroundColor: "#000",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 3,
  },
  buttonResetTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
  },
  drawTile: {
    backgroundColor: "red", 
  },
});
export default Main;
