import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Checkbox, IconButton } from "react-native-paper";
import Footer from "../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    if (newTodo === "") {
      return;
    }
    const todoItem = {
      text: newTodo,
      checked: false,
    };
    const updatedTodos = [...todos, todoItem];
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    setNewTodo("");
  };

  const removeTodo = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const toggleChecked = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const loadTodos = async () => {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    };
    loadTodos();
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/images/Background.png")}
    >
      <View style={styles.container}>
        <Text style={styles.header}>My Todo List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newTodo}
            onChangeText={(text) => setNewTodo(text)}
            placeholder="Add a new todo"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {todos.map((todo, index) => (
            <View key={index} style={styles.todoItem}>
              <Checkbox.Android
                status={todo.checked ? "checked" : "unchecked"}
                onPress={() => toggleChecked(index)}
              />
              <Text
                style={[
                  styles.todoText,
                  {
                    textDecorationLine: todo.checked ? "line-through" : "none",
                  },
                ]}
              >
                {todo.text}
              </Text>
              <IconButton
                icon="close"
                color="#0B4B1D"
                size={18}
                onPress={() => removeTodo(index)}
                style={styles.removeButton}
              />
            </View>
          ))}
        </View>
        <Footer />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F4FBFA",
    alignItems: "center",
    // justifyContent: "center",
    padding: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0B4B1D",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f3f5fb",
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#0B4B1D",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#F4FBFA",
    fontWeight: "bold",
  },
  listContainer: {
    alignSelf: "stretch",
    padding: 20,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  todoText: {
    fontSize: 18,
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: "transparent",
    marginLeft: "auto",
  },
});
