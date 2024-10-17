import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { data, height, width } from "./index"; // Importe les données ou fais appel à une API
import { useLocalSearchParams } from "expo-router";
import { Header } from "@/components/Header";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams(); // Récupère l'ID du cours depuis les paramètres de la route

  // Récupérer les détails du cours en fonction de l'ID
  const course = data.find((item) => item.id === id);

  // Si le cours n'est pas trouvé, retourne un message d'erreur
  if (!course) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.errorText}>Cours non trouvé.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* L'en-tête avec la catégorie */}
      <Header title={`Détails - ${course.category}`} />
      {/* Utilisation du ScrollView pour permettre le défilement du contenu */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={course.image} style={styles.image} />
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>
        <Text style={styles.level}>{`Niveau : ${course.level}`}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollViewContent: {
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  level: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "500",
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
