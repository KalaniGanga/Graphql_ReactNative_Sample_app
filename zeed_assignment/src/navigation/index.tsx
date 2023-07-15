import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { LoginScreen, SignUpScreen, SplashScreen } from "../screens";
import BottomTabNavigator from "./BottomTabNavigator";

const Router = createStackNavigator(
  {
    SplashScreen,
    LoginScreen,
    SignUpScreen,
    BottomTabNavigator,
  },

  {
    initialRouteName: "SplashScreen",
    headerMode: "none"
  }
);

export default createAppContainer(Router);
