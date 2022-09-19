import { StyleSheet, Pressable } from "react-native";
import React from "react";

const Button = ({ onPress, children, style }) => {
  return (
    <Pressable onPress={onPress} style={style}>
      {children}
    </Pressable>
  );
};

export default Button;
