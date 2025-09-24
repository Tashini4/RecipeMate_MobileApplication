import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { getCurrentUser } from '@/services/authService';
import { Recipe } from '@/types/recipe';
import { deleteRecipe, getRecipes, saveRecipe, updateRecipe } from '@/services/recipeService';

const RecipeApp = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [formData, setFormData] = useState<Recipe>({
    id: '',
    title: '',
    note: '',
    date: '',
    time: '',
    email: '',
    image: '',
  });

  React.useEffect(() => {
    getAllRecipes();
  }, []);

  const theme = {
    light: {
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212121',
      secondaryText: '#757575',
      accent: '#ff7043',
      border: '#e0e0e0',
    },
    dark: {
      background: '#121212',
      surface: '#1e1e1e',
      text: '#f5f5f5',
      secondaryText: '#b0b0b0',
      accent: '#ff8a65',
      border: '#2d2d2d',
    },
  };

  const colors = isDarkTheme ? theme.dark : theme.light;

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ id: '', title: '', note: '', date: '', time: '', email: '', image: '' });
    setIsEditing(false);
  };

  const openEditModal = (recipe: Recipe) => {
    setFormData(recipe);
    setIsEditing(true);
    setModalVisible(true);
  };

  const getAllRecipes = async () => {
    try {
      const email = user ? user.email : await getCurrentUser();
      if (email) {
        const reminders = await getRecipes();
        const userRecipes = reminders.filter((r) => r.email === email);
        setRecipes(userRecipes);
      } else {
        Alert.alert('Error', 'No user is currently logged in');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSaveRecipe = async () => {
    try {
      const email = user ? user.email : await getCurrentUser();
      if (!email) {
        Alert.alert('Error', 'No user logged in');
        return;
      }

      const newRecipe: Recipe = { ...formData, email };

      if (isEditing) {
        await updateRecipe(newRecipe.id, newRecipe);
        Alert.alert('Success', 'Recipe updated successfully');
      } else {
        await saveRecipe(newRecipe);
        Alert.alert('Success', 'Recipe added successfully');
      }

      resetForm();
      setModalVisible(false);
      getAllRecipes();
    } catch (error) {
      console.error('Error saving recipe:', error);
      Alert.alert('Error', 'Failed to save recipe');
    }
  };

  const handleDeleteRecipe = (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this recipe?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteRecipe(id);
            getAllRecipes();
            Alert.alert('Deleted', 'Recipe has been deleted');
          } catch (error) {
            console.error('Error deleting recipe:', error);
            Alert.alert('Error', 'Failed to delete recipe');
          }
        },
      },
    ]);
  };

  const renderRecipeItem = (item: Recipe) => (
    <View
      key={item.id}
      style={[styles.recipeItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.recipeImage} />
      ) : (
        <View style={[styles.recipeImagePlaceholder, { backgroundColor: colors.border }]}>
          <Text style={{ color: colors.secondaryText }}>No Image</Text>
        </View>
      )}
      <View style={styles.recipeContent}>
        <Text style={[styles.recipeTitle, { color: colors.text }]}>{item.title}</Text>
        {item.note ? (
          <Text style={[styles.recipeDescription, { color: colors.secondaryText }]} numberOfLines={2}>
            {item.note}
          </Text>
        ) : null}
        {item.time ? (
          <Text style={[styles.recipeTime, { color: colors.secondaryText }]}>⏱ {item.time}</Text>
        ) : null}
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editButton}>
          <Text style={[styles.editButtonText, { color: colors.accent }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteRecipe(item.id)} style={styles.deleteButton}>
          <Text style={[styles.deleteButtonText, { color: '#e53935' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Recipes</Text>
        <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)} style={styles.themeToggle}>
          <Text style={[styles.themeToggleText, { color: colors.accent }]}>
            {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recipe List */}
      <ScrollView style={styles.recipeList}>
        {recipes.length > 0 ? (
          recipes.map(renderRecipeItem)
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
              No recipes yet. Add one to get started!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Recipe Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.accent }]}
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+ Add Recipe</Text>
      </TouchableOpacity>

      {/* Add/Edit Recipe Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          resetForm();
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {isEditing ? 'Edit Recipe' : 'Add New Recipe'}
            </Text>

            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Recipe Image URL"
              placeholderTextColor={colors.secondaryText}
              value={formData.image}
              onChangeText={(text) => handleInputChange('image', text)}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Recipe Title"
              placeholderTextColor={colors.secondaryText}
              value={formData.title}
              onChangeText={(text) => handleInputChange('title', text)}
            />

            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Description"
              placeholderTextColor={colors.secondaryText}
              value={formData.note}
              onChangeText={(text) => handleInputChange('note', text)}
              multiline
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Cooking Time (e.g. 30 mins)"
              placeholderTextColor={colors.secondaryText}
              value={formData.time}
              onChangeText={(text) => handleInputChange('time', text)}
            />

            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="Ingredients (comma-separated)"
              placeholderTextColor={colors.secondaryText}
              value={formData.date}
              onChangeText={(text) => handleInputChange('date', text)}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton, { borderColor: colors.border }]}
                onPress={() => {
                  resetForm();
                  setModalVisible(false);
                }}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.accent }]}
                onPress={handleSaveRecipe}
              >
                <Text style={styles.saveButtonText}>{isEditing ? 'Update Recipe' : 'Save Recipe'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 20,
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  themeToggle: { padding: 8 },
  themeToggleText: { fontWeight: '600' },
  recipeList: { flex: 1, padding: 16 },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  recipeImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeContent: { flex: 1 },
  recipeTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  recipeDescription: { fontSize: 14, marginBottom: 4 },
  recipeTime: { fontSize: 12 },
  actionsContainer: { flexDirection: 'row', alignItems: 'center' },
  editButton: { padding: 6, marginRight: 6 },
  editButtonText: { fontWeight: '600' },
  deleteButton: { padding: 6 },
  deleteButtonText: { fontWeight: '600' },
  emptyState: { alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyStateText: { fontSize: 16, textAlign: 'center' },
  addButton: { margin: 16, padding: 16, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: { width: '90%', padding: 20, borderRadius: 12, borderWidth: 1 },
  modalTitle: { fontSize: 20, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalButton: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  cancelButton: { borderWidth: 1 },
  cancelButtonText: { fontWeight: '600' },
  saveButtonText: { color: '#fff', fontWeight: '600' },
});

export default RecipeApp;
