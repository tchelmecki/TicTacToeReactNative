import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image, Animated, TouchableHighlight } from "react-native";

const Bottom = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuSlide = new Animated.Value(0);

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Nie można otworzyć linku:", url);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    if (menuVisible) {
      Animated.timing(menuSlide, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(menuSlide, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setMenuVisible(false);
      });
    }
  }, [menuVisible]);

  const interpolatedMenuSlide = menuSlide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180], // Długość wysunięcia menu
  });

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={toggleMenu}
      >
        <Image style={styles.image} source={require("../assets/arrowLeft.png")}></Image>
      </TouchableHighlight>

      <Animated.View style={[styles.menu, { width: interpolatedMenuSlide }]}>
        <TouchableOpacity style={styles.menu1} onPress={() => openLink("https://github.com/tchelmecki?tab=repositories")}>
          <Image style={styles.cat} source={require('../assets/cat.png')}></Image>
          <Text style={styles.text}>myGitHub</Text>
        </TouchableOpacity>
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#000',
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#fff',
    marginLeft: 20,
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  menu: {
    flexDirection: 'row', // Ustawia obrazy obok siebie
    alignItems: 'center', // Wyśrodkowanie w pionie
    zIndex: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: '#fff',
    height: 50,
    width: 150,
    overflow: 'hidden',
    position: 'absolute',
    left: 75,
    bottom: 20,
  },
  menu1:{
    flexDirection: 'row', // Ustawia obrazy obok siebie
    alignItems: 'center',
    
  },
  image: {
    resizeMode: 'center',
    width: 50,
    height: 50,
  },
  cat: {
    resizeMode: 'center',
    height: 30,
    width: 30,
    marginLeft:10,
    marginLeft: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:10,
  }
});

export default Bottom;
