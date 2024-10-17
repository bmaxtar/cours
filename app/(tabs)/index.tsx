import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Header } from "@/components/Header";
import { router } from "expo-router";

export type DataType = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  level: string;
};

export const data: DataType[] = [
  {
    id: "1",
    title: "Histoire & Géographie",
    description:
      "Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis",
    image: require("../../assets/images/book.jpg"),
    category: "Histoire & Geography",
    level: "Débutant",
  },
  {
    id: "2",
    title: "Développement web",
    description:
      "Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis",
    image: require("../../assets/images/book.jpg"),
    category: "Développement",
    level: "Intermédiaire",
  },
  {
    id: "3",
    title: "UI UX Design",
    description:
      "Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis",
    image: require("../../assets/images/book.jpg"),
    category: "Design",
    level: "Avancé",
  },
  {
    id: "4",
    title: "Cloud Computings",
    description:
      "Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis",
    image: require("../../assets/images/book.jpg"),
    category: "Cloud Computing",
    level: "Débutant",
  },
  {
    id: "5",
    title: "Développement Mobile",
    description:
      "Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis Ut in quod explicabo Adipisci molestiae nostrum in deleniti ea quibusdam quis",
    image: require("../../assets/images/book.jpg"),
    category: "Développement",
    level: "Intermédiaire",
  },
];

const categories = [
  "Tout",
  "Histoire & Geography",
  "Développement",
  "Design",
  "Cloud Computing",
  "DevOps",
  "Marketing",
  "IA & Machine Learning",
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [coursData, setCoursData] = useState(data);

  const loadMoreData = () => {
    setCoursData((prevData) => [...prevData, ...data]);
  };

  const filteredCourses =
    selectedCategory === "Tout"
      ? data
      : data.filter((course) => course.category === selectedCategory);

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        setSelectedCategory(item);
        setCoursData(filteredCourses);
      }}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const CategoItem = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Catégories</Text>
      <FlatList
        data={categories}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={renderCategoryItem}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Cours" />
      <FlatList
        data={filteredCourses}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CoursItem item={item} />}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={CategoItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export const { width, height } = Dimensions.get("window");

const CoursItem = ({ item }: { item: DataType }) => {
  return (
    <TouchableOpacity
      style={styles.coursItemContainer}
      onPress={() =>
        router.navigate({
          pathname: "/(tabs)/details",
          params: { id: item.id },
        })
      }
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text style={styles.level}>{item.level}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  flatListContainer: {
    paddingVertical: 10,
  },
  coursItemContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  image: {
    width: width * 0.4,
    height: height * 0.1,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  level: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "500",
    marginTop: 5,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
