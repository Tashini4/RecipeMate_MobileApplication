import { View, Text, TouchableOpacity, Image, TextInput, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Recipe = {
  id: string;
  name: string;
  prepTime: string;
  description: string;
  image: string;
  category: string;
  isFavorite: boolean;
  difficulty: string;
  ingredients: string[];
};

const RecipesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  // Categories
  const categories: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: "all", name: "All Recipes", icon: "restaurant" },
    { id: "breakfast", name: "Breakfast", icon: "cafe" },
    { id: "lunch", name: "Lunch", icon: "fast-food" },
    { id: "dinner", name: "Dinner", icon: "restaurant" },
    { id: "dessert", name: "Desserts", icon: "ice-cream" },
    { id: "vegetarian", name: "Vegetarian", icon: "leaf" },
    { id: "quick", name: "Quick Meals", icon: "time" },
  ];

  // Sample recipe data
  const recipes = [
    {
    id: "1",
    name: "Blueberry Pancakes",
    prepTime: "20 mins",
    description: "Fluffy pancakes with fresh blueberries",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
    category: "breakfast",
    isFavorite: true,
    difficulty: "Easy",
    ingredients: ["1 cup all-purpose flour", "1 tbsp sugar", "1 tsp baking powder", "1 egg", "1 cup milk", "1/2 cup blueberries", "Butter for cooking"]
  },
  {
    id: "2",
    name: "Avocado Toast",
    prepTime: "10 mins",
    description: "Creamy avocado on toasted artisan bread",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop",
    category: "breakfast",
    isFavorite: false,
    difficulty: "Easy",
    ingredients: ["2 slices artisan bread", "1 ripe avocado", "Salt & pepper", "Lemon juice", "Olive oil (optional)"]
  },
  {
    id: "3",
    name: "Caesar Salad",
    prepTime: "15 mins",
    description: "Classic salad with romaine and parmesan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
    category: "lunch",
    isFavorite: true,
    difficulty: "Easy",
    ingredients: ["Romaine lettuce", "Croutons", "Parmesan cheese", "Caesar dressing", "Lemon juice"]
  },
  {
    id: "4",
    name: "Grilled Salmon",
    prepTime: "25 mins",
    description: "Perfectly grilled salmon with herbs",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop",
    category: "dinner",
    isFavorite: false,
    difficulty: "Medium",
    ingredients: ["2 salmon fillets", "Olive oil", "Garlic", "Fresh herbs (dill, parsley)", "Salt & pepper", "Lemon wedges"]
  },
  {
    id: "5",
    name: "Chocolate Cake",
    prepTime: "45 mins",
    description: "Rich and moist chocolate cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
    category: "dessert",
    isFavorite: true,
    difficulty: "Medium",
    ingredients: ["1 1/2 cups flour", "1 cup sugar", "1/2 cup cocoa powder", "2 eggs", "1 cup milk", "1/2 cup butter", "1 tsp baking powder"]
  },
  {
    id: "6",
    name: "Veggie Stir Fry",
    prepTime: "20 mins",
    description: "Colorful vegetables in savory sauce",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop",
    category: "vegetarian",
    isFavorite: false,
    difficulty: "Easy",
    ingredients: ["Broccoli", "Carrots", "Bell peppers", "Soy sauce", "Garlic", "Ginger", "Sesame oil"]
  },
  {
    id: "7",
    name: "Pasta Carbonara",
    prepTime: "30 mins",
    description: "Creamy pasta with bacon and cheese",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
    category: "dinner",
    isFavorite: true,
    difficulty: "Medium",
    ingredients: ["Spaghetti", "Egg yolks", "Parmesan cheese", "Bacon or pancetta", "Black pepper"]
  },
  {
    id: "8",
    name: "Berry Smoothie",
    prepTime: "5 mins",
    description: "Refreshing mixed berry smoothie",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=200&fit=crop",
    category: "quick",
    isFavorite: false,
    difficulty: "Easy",
    ingredients: ["1 cup mixed berries", "1 banana", "1 cup milk or yogurt", "1 tbsp honey (optional)"]
  },
  {
    id: "9",
    name: "French Omelette",
    prepTime: "7 mins",
    description: "Soft and creamy classic omelette",
    image: "https://images.unsplash.com/photo-1600721429282-2fd61d06d01e?w=300&h=200&fit=crop",
    category: "breakfast",
    isFavorite: true,
    difficulty: "Easy",
    ingredients: ["3 eggs", "Butter", "Salt & pepper", "Chives (optional)"]
  },
  {
    id: "10",
    name: "Chicken Burrito",
    prepTime: "35 mins",
    description: "Spiced chicken with beans wrapped in tortilla",
    image: "https://images.unsplash.com/photo-1617196036403-5b91c9e69957?w=300&h=200&fit=crop",
    category: "lunch",
    isFavorite: false,
    difficulty: "Medium",
    ingredients: ["Tortillas", "Cooked chicken", "Black beans", "Rice", "Cheese", "Salsa"]
  },
  {
    id: "11",
    name: "Beef Steak",
    prepTime: "40 mins",
    description: "Juicy seared steak with garlic butter",
    image: "https://images.unsplash.com/photo-1553163147-622ab57e69e6?w=300&h=200&fit=crop",
    category: "dinner",
    isFavorite: true,
    difficulty: "Hard",
    ingredients: ["Beef steak", "Garlic", "Butter", "Rosemary", "Salt & pepper"]
  },
  {
    id: "12",
    name: "Mango Cheesecake",
    prepTime: "50 mins",
    description: "No-bake creamy mango cheesecake",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&h=200&fit=crop",
    category: "dessert",
    isFavorite: false,
    difficulty: "Medium",
    ingredients: ["Cream cheese", "Mango puree", "Sugar", "Whipped cream", "Graham cracker crust"]
  },
  {
    id: "13",
    name: "Greek Salad",
    prepTime: "12 mins",
    description: "Fresh salad with feta, olives, and cucumber",
    image: "https://images.unsplash.com/photo-1565958011703-44e686c84a48?w=300&h=200&fit=crop",
    category: "vegetarian",
    isFavorite: true,
    difficulty: "Easy",
    ingredients: ["Tomatoes", "Cucumber", "Olives", "Feta cheese", "Olive oil", "Oregano"]
  },
  {
    id: "14",
    name: "Spaghetti Bolognese",
    prepTime: "45 mins",
    description: "Classic Italian pasta with meat sauce",
    image: "https://images.unsplash.com/photo-1617191519108-7f1e76a0b73b?w=300&h=200&fit=crop",
    category: "dinner",
    isFavorite: false,
    difficulty: "Medium",
    ingredients: ["Spaghetti", "Ground beef", "Tomato sauce", "Garlic", "Onion", "Olive oil"]
  },
  {
    id: "15",
    name: "Caprese Sandwich",
    prepTime: "10 mins",
    description: "Tomato, mozzarella, and basil sandwich",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9e?w=300&h=200&fit=crop",
    category: "lunch",
    isFavorite: false,
    difficulty: "Easy",
    ingredients: ["Ciabatta bread", "Fresh mozzarella", "Tomatoes", "Basil leaves", "Olive oil"]
  },
  {
    id: "16",
    name: "Energy Balls",
    prepTime: "8 mins",
    description: "No-bake oat and peanut butter snack balls",
    image: "https://images.unsplash.com/photo-1601312378582-3f3e47a032e6?w=300&h=200&fit=crop",
    category: "quick",
    isFavorite: true,
    difficulty: "Easy",
    ingredients: ["Rolled oats", "Peanut butter", "Honey", "Chia seeds", "Chocolate chips (optional)"]
  }
  ];

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategoryItem = ({ item }: { item: { id: string; name: string; icon: string } }) => (
    <TouchableOpacity
      style={[styles.categoryItem, selectedCategory === item.id && styles.categoryItemSelected]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons
        name={item.icon as any}
        size={24}
        color={selectedCategory === item.id ? "#fff" : "#FF6B35"}
      />
      <Text style={[styles.categoryText, selectedCategory === item.id && styles.categoryTextSelected]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <View style={styles.recipeHeader}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <TouchableOpacity>
            <Ionicons
              name={item.isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={item.isFavorite ? "#FF6B35" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.recipeDescription}>{item.description}</Text>
        <View style={styles.recipeMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.metaText}>{item.prepTime}</Text>
          </View>
          <View style={[styles.metaItem, styles.difficultyBadge]}>
            <Text
              style={[
                styles.difficultyText,
                {
                  color:
                    item.difficulty === "Easy"
                      ? "#4CAF50"
                      : item.difficulty === "Medium"
                      ? "#FF9800"
                      : "#F44336",
                },
              ]}
            >
              {item.difficulty}
            </Text>
          </View>
        </View>
      </View>

      {// View Button with Navigation
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => router.push({ pathname: "/recipe-details", params: { recipe: JSON.stringify(item) } })}
      >
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity> }
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient colors={["#FF6B35", "#FF9E6D"]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>RecipeMate</Text>
          <Text style={styles.headerSubtitle}>Discover amazing dishes</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            placeholder="Search recipes..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#777" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Recipes List */}
        <View style={styles.recipesSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "all"
              ? "All Recipes"
              : categories.find(cat => cat.id === selectedCategory)?.name}
            <Text style={styles.resultsCount}> ({filteredRecipes.length} recipes)</Text>
          </Text>

          {filteredRecipes.length > 0 ? (
            <FlatList
              data={filteredRecipes}
              renderItem={renderRecipeItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.recipesList}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>No recipes found</Text>
              <Text style={styles.emptyStateSubtext}>Try adjusting your search or filter criteria</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 4,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  headerContent: {
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.85,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    paddingVertical: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  categoriesSection: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  categoriesList: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#FF6B35",
  },
  categoryItemSelected: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#FF6B35",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  recipesSection: {
    flex: 1,
  },
  resultsCount: {
    fontSize: 14,
    color: "#888",
    fontWeight: "400",
  },
  recipesList: {
    paddingBottom: 24,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    overflow: "hidden",
    position: "relative",
  },
  recipeImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  recipeInfo: {
    padding: 14,
  },
  recipeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
    marginRight: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  difficultyBadge: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  difficultyText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  viewButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    elevation: 2,
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: "#888",
    fontWeight: "bold",
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
})


// ...existing code...

export default RecipesScreen;
