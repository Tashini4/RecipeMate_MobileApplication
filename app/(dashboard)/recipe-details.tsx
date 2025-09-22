import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeDetails() {
  const router = useRouter();
  const { recipe } = useLocalSearchParams();
  const parsedRecipe = recipe ? JSON.parse(recipe as string) : null;

  if (!parsedRecipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#FF6B35" />
      </TouchableOpacity>

      {/* Recipe Image */}
      <Image source={{ uri: parsedRecipe.image }} style={styles.image} />

      {/* Title & Info */}
      <Text style={styles.title}>{parsedRecipe.name}</Text>
      <Text style={styles.description}>{parsedRecipe.description}</Text>

      <View style={styles.metaRow}>
        <Ionicons name="time-outline" size={16} color="#555" />
        <Text style={styles.metaText}>{parsedRecipe.prepTime}</Text>
      </View>

      {/* Ingredients */}
      <Text style={styles.sectionTitle}>Ingredients</Text>
      {parsedRecipe.ingredients.map((item: string, index: number) => (
        <View key={index} style={styles.ingredientItem}>
          <Ionicons name="checkmark-circle" size={16} color="#FF6B35" />
          <Text style={styles.ingredientText}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F2",
    padding: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  metaText: {
    marginLeft: 6,
    color: "#555",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ingredientText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#444",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "red",
  },
});
