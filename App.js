import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Welcome from "./Screens/Welcome";
import Home from "./Screens/Home";
import Meditate from "./Screens/Meditate";
import Todo from "./Screens/Todo";
import Resources from "./Screens/Resources";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  function DrawerNavigator() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F4FBFA",
            shadowColor: "transparent",
          },
          headerTintColor: "#106d60",
          drawerActiveTintColor: "#106d60",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: "" }}
        />
        <Drawer.Screen
          name="Meditate"
          component={Meditate}
          options={{ headerTitle: "" }}
        />
        <Drawer.Screen
          name="Todo"
          component={Todo}
          options={{ headerTitle: "" }}
        />
        <Drawer.Screen
          name="Resources"
          component={Resources}
          options={{ headerTitle: "" }}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
