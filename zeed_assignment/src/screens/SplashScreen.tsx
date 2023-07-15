import React, { memo, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import {Background} from "../components";
import { Navigation } from "../types";
import { theme } from "../core/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: Navigation;
};

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const value = await AsyncStorage.getItem("uid");
        let screen = value != null ? "BottomTabNavigator" : "LoginScreen";
        navigation.navigate(screen);
      } catch (e) {
        console.log(e);
      }
    };
    checkUserLogin();
  }, []);

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default memo(SplashScreen);
