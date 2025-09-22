import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type Recipe = {
  id: string;
  name: string;
  prepTime: string;
  description: string;
  image: string;
  category: string;
  isFavorite: boolean;
  difficulty: string;
};

const RecipesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Recipe categories
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
      difficulty: "Easy"
    },
    {
      id: "3",
      name: "Caesar Salad",
      prepTime: "15 mins",
      description: "Classic salad with romaine and parmesan",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
      category: "lunch",
      isFavorite: true,
      difficulty: "Easy"
    },
    {
      id: "4",
      name: "Grilled Salmon",
      prepTime: "25 mins",
      description: "Perfectly grilled salmon with herbs",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop",
      category: "dinner",
      isFavorite: false,
      difficulty: "Medium"
    },
    {
      id: "5",
      name: "Chocolate Cake",
      prepTime: "45 mins",
      description: "Rich and moist chocolate cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
      category: "dessert",
      isFavorite: true,
      difficulty: "Medium"
    },
    {
      id: "6",
      name: "Veggie Stir Fry",
      prepTime: "20 mins",
      description: "Colorful vegetables in savory sauce",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop",
      category: "vegetarian",
      isFavorite: false,
      difficulty: "Easy"
    },
    {
      id: "7",
      name: "Pasta Carbonara",
      prepTime: "30 mins",
      description: "Creamy pasta with bacon and cheese",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
      category: "dinner",
      isFavorite: true,
      difficulty: "Medium"
    },
    {
      id: "8",
      name: "Berry Smoothie",
      prepTime: "5 mins",
      description: "Refreshing mixed berry smoothie",
      image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=200&fit=crop",
      category: "quick",
      isFavorite: false,
      difficulty: "Easy"
    },
    
  ];

  // Filter recipes based on selected category and search query
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategoryItem = ({ item }: { item: { id: string; name: string; icon: string } }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemSelected
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons 
        name={item.icon as any} 
        size={24} 
        color={selectedCategory === item.id ? "#fff" : "#FF6B35"} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.categoryTextSelected
      ]}>
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
            <Text style={[
              styles.difficultyText,
              { color: item.difficulty === "Easy" ? "#4CAF50" : item.difficulty === "Medium" ? "#FF9800" : "#F44336" }
            ]}>
              {item.difficulty}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#FF6B35', '#FF9E6D']}
        style={styles.header}
      >
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
            {selectedCategory === "all" ? "All Recipes" : 
             categories.find(cat => cat.id === selectedCategory)?.name}
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
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filter criteria
              </Text>
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
    backgroundColor: '#FFF9F2', // Warm off-white background
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    marginBottom: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF9F2',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    padding: 12,
    marginRight: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#FFE4CC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryItemSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: 'white',
  },
  recipesSection: {
    flex: 1,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },
  recipesList: {
    paddingBottom: 20,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFE4CC',
  },
  recipeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  recipeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  difficultyBadge: {
    backgroundColor: '#FFF9F2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default RecipesScreen;