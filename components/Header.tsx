import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export function Header({
  title,
  bg = "#FFF",
}: {
  title: string;
  bg?: string;
  onPressAdd?: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.headerContainer, { backgroundColor: bg }]}>
      <View style={styles.containerAvatar}>
        <Image
          source={{
            uri: "https://gravatar.com/avatar/8547eb15166315e920ae680c2bb10db5?s=400&d=robohash&r=x",
          }}
          style={styles.avatar}
        />
        <Text style={styles.homeHeaderTitle}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  containerAvatar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF",
    padding: 8,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  homeHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
});
