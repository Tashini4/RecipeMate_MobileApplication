import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Image } from "react-native";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';

const Home = () => {
  const features: { id: string; title: string; icon: keyof typeof MaterialIcons.glyphMap; description: string }[] = [
    { id: '1', title: 'Recipe Collection', icon: 'restaurant', description: 'Discover thousands of delicious recipes from around the world' },
    { id: '2', title: 'Meal Planning', icon: 'event-note', description: 'Plan your meals for the week with our easy-to-use tools' },
    { id: '3', title: 'Cooking Tips', icon: 'lightbulb', description: 'Get expert cooking tips and techniques to improve your skills' },
    { id: '4', title: 'Grocery Lists', icon: 'list-alt', description: 'Generate shopping lists based on your selected recipes' },
  ];

  const popularCategories: { id: string; name: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: '1', name: 'Breakfast', icon: 'sunny-outline' },
    { id: '2', name: 'Lunch', icon: 'restaurant-outline' },
    { id: '3', name: 'Dinner', icon: 'moon-outline' },
    { id: '4', name: 'Desserts', icon: 'ice-cream-outline' },
    { id: '5', name: 'Vegetarian', icon: 'leaf-outline' },
    { id: '6', name: 'Quick Meals', icon: 'time-outline' },
  ];

  const contactMethods: { id: string; type: string; value: string; icon: 'phone' | 'email' | 'location-on'; action: string }[] = [
    { id: '1', type: 'Phone', value: '+1 (555) 123-FOOD', icon: 'phone', action: 'tel:+15551234567' },
    { id: '2', type: 'Email', value: 'hello@recipeMate.com', icon: 'email', action: 'mailto:hello@recipeMate.com' },
    { id: '3', type: 'Address', value: '123 Culinary Street, Food City', icon: 'location-on', action: 'https://maps.google.com' },
  ];

  return (
    <View style={styles.container}>
      {/* Background Image for glass effect context */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3' }} 
        style={styles.backgroundImage}
        blurRadius={10}
      />
      
      {/* Header */}
      <BlurView intensity={80} tint="light" style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.appName}>RecipeMate</Text>
            <Text style={styles.tagline}>Cook, Share, Enjoy!</Text>
          </View>
        </View>
      </BlurView>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Hero Section */}
        <BlurView intensity={70} tint="light" style={styles.heroSection}>
          <Text style={styles.heroText}>Discover amazing recipes from around the world</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Recipes</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </BlurView>

        {/* Categories Section */}
        <BlurView intensity={70} tint="light" style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {popularCategories.map(item => (
              <TouchableOpacity key={item.id} style={styles.categoryCard}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name={item.icon} size={28} color="#FF6B35" />
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BlurView>

        {/* About Us Section */}
        <BlurView intensity={70} tint="light" style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About RecipeMate</Text>
          <Text style={styles.aboutText}>
            Recipemate is your ultimate cooking companion, designed to inspire your inner chef 
            and simplify meal planning. Discover thousands of delicious recipes from cuisines around the world.
          </Text>
          <Text style={styles.aboutText}>
            Our mission is to create a vibrant community of food lovers who share their culinary 
            creations and help others discover the joy of cooking.
          </Text>
        </BlurView>

        {/* Features Section */}
        <BlurView intensity={70} tint="light" style={styles.section}>
          <Text style={styles.sectionTitle}>Our Features</Text>
          <View style={styles.featuresGrid}>
            {features.map(item => (
              <View key={item.id} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <MaterialIcons name={item.icon} size={28} color="#FF6B35" />
                </View>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </BlurView>

        {/* Recipe of the Day */}
        <BlurView intensity={70} tint="light" style={styles.recipeOfTheDay}>
          <Text style={styles.sectionTitle}>Recipe of the Day</Text>
          <View style={styles.recipeCard}>
            <View style={styles.recipeImagePlaceholder}>
              <Ionicons name="restaurant" size={40} color="#FF6B35" />
              <Text style={styles.recipePlaceholderText}>Creamy Mushroom Pasta</Text>
            </View>
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>Creamy Mushroom Pasta</Text>
              <Text style={styles.recipeDescription}>A delicious and easy-to-make pasta dish with a creamy mushroom sauce.</Text>
              <TouchableOpacity style={styles.viewRecipeButton}>
                <Text style={styles.viewRecipeButtonText}>View Recipe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        {/* Contact Us Section */}
        <BlurView intensity={70} tint="light" style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.contactIntro}>
            Have questions or want to share a recipe? We'd love to hear from you!
          </Text>
          
          <View style={styles.contactMethods}>
            {contactMethods.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.contactCard}
                onPress={() => Linking.openURL(item.action)}
              >
                <MaterialIcons name={item.icon} size={24} color="#FF6B35" />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactType}>{item.type}</Text>
                  <Text style={styles.contactValue}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </BlurView>

        {/* Footer */}
        <BlurView intensity={80} tint="light" style={styles.footer}>
          <Text style={styles.footerText}>© 2025 RecipeMate. All rights reserved.</Text>
        </BlurView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 228, 204, 0.5)',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeSection: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    color: '#E67F4C',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '300',
  },
  appName: {
    color: '#FF6B35',
    fontSize: 36,
    fontWeight: '800',
    marginTop: 5,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    color: '#E67F4C',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    padding: 25,
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 107, 53, 0.7)',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  heroText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 204, 0.5)',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  categoriesScroll: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 100,
  },
  categoryIconContainer: {
    backgroundColor: 'rgba(255, 249, 242, 0.7)',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 228, 204, 0.5)',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5C5C5C',
    textAlign: 'center',
  },
  aboutSection: {
    padding: 25,
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 204, 0.5)',
    overflow: 'hidden',
  },
  aboutText: {
    color: '#5C5C5C',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 249, 242, 0.7)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 204, 0.5)',
  },
  featureIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 204, 0.5)',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#5C5C5C',
    textAlign: 'center',
    lineHeight: 20,
  },
  recipeOfTheDay: {
    padding: 20,
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 204, 0.5)',
    overflow: 'hidden',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 249, 242, 0.7)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 204, 0.5)',
  },
  recipeImagePlaceholder: {
    width: 120,
    backgroundColor: 'rgba(255, 238, 221, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  recipePlaceholderText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  recipeInfo: {
    flex: 1,
    padding: 15,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#5C5C5C',
    marginBottom: 15,
    lineHeight: 20,
  },
  viewRecipeButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewRecipeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contactSection: {
    padding: 25,
    margin: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 204, 0.5)',
    overflow: 'hidden',
  },
  contactIntro: {
    color: '#5C5C5C',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactMethods: {
    marginTop: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 249, 242, 0.7)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 228, 204, 0.5)',
  },
  contactInfo: {
    marginLeft: 16,
  },
  contactType: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#5C5C5C',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 228, 204, 0.5)',
    overflow: 'hidden',
  },
  footerText: {
    color: '#5C5C5C',
    fontSize: 14,
  },
});

export default Home;