import { StyleSheet, View, Text } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>&copy; Jayanta Adhikary 2023</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#F4FBFA",
    fontWeight: "500",
    fontStyle: 'italic',
    fontSize: 12,
  },
});
