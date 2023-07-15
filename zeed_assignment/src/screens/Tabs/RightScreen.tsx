import React, { memo, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Background } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../core/theme";
import { useIsFocused } from "@react-navigation/native";

const ThreeScreen = () => {
  const [favNumber, setFavNumber] = useState({ value: "", error: "" });
  const isFocused = useIsFocused();
  useEffect(() => {
    checkFavNumber();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      const storeData = await AsyncStorage.getItem("favNum");
      if (storeData) {
        setFavNumber({ value: storeData, error: "" });
      }
    })();
  }, []);

  const checkFavNumber = async () => {
    try {
      const val = await AsyncStorage.getItem("favNum");
      if (val != null) {
        setFavNumber({ value: val, error: "" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Background>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.modalText}>
            {`My favorite number is ${favNumber.value}`}
          </Text>
          <Text style={styles.modalText}></Text>
        </View>
      </View>
    </Background>
  );
};

export default memo(ThreeScreen);

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 18,
    color: theme.colors.primary,
    textAlign: "center",
  },
});
