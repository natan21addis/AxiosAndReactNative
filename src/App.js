import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [responseMessage, setResponseMessage] = useState(""); // State for response message
  const [userID, setUserID] = useState(""); // User ID for update and fetch by ID
  const [userName, setUserName] = useState(""); // User name for adding new user
  const [isFormVisible, setIsFormVisible] = useState(true); // To toggle visibility of form after success
  const [confirmDelete, setConfirmDelete] = useState(false); // For delete confirmation

  // Base URL for the API
  const apiBaseURL = 'https://crudcrud.com/api/ab643670a58749deb9e38e18cb9f6dda';

  // Fetch all users
  const callGetUsersList = () => {
    axios.get(`${apiBaseURL}/users`)
      .then(response => {
        const data = response.data;
        if (data.length > 0) {
          setResponseMessage(`Users: \n${JSON.stringify(data, null, 2)}`);
        } else {
          setResponseMessage('No users found.');
        }
      })
      .catch(error => {
        setResponseMessage(`Error fetching users: ${error.message}`);
      });
  };

  // Fetch user by ID
  const callGetUserById = (id) => {
    axios.get(`${apiBaseURL}/users/${id}`)
      .then(response => {
        const data = response.data;
        if (data) {
          setResponseMessage(`User Found: \n${JSON.stringify(data, null, 2)}`);
        } else {
          setResponseMessage('No user found with that ID.');
        }
      })
      .catch(error => {
        setResponseMessage(`Error fetching user by ID: ${error.message}`);
      });
  };

  // Add a new user
  const callAddUser = () => {
    if (!userName) {
      setResponseMessage("Please provide a user name.");
      return;
    }
    const params = { name: userName };
    axios.post(`${apiBaseURL}/users`, params)
      .then(response => {
        setResponseMessage(`User added successfully: \n${JSON.stringify(response.data)}`);
        setIsFormVisible(false); // Hide form after success
      })
      .catch(error => {
        setResponseMessage(`Error adding user: ${error.message}`);
      });
  };

  // Update user by ID
  const callUpdateUser = () => {
    if (!userID || !userName) {
      setResponseMessage("Please provide both user ID and user name.");
      return;
    }
    const params = { name: userName };
    axios.put(`${apiBaseURL}/users/${userID}`, params)
      .then(response => {
        setResponseMessage(`User updated successfully: \n${JSON.stringify(response.data)}`);
        setIsFormVisible(false); // Hide form after success
      })
      .catch(error => {
        setResponseMessage(`Error updating user: ${error.message}`);
      });
  };

  // Delete user by ID
  const callDeleteUser = () => {
    if (!userID) {
      setResponseMessage("Please provide a user ID to delete.");
      return;
    }
    axios.delete(`${apiBaseURL}/users/${userID}`)
      .then(response => {
        setResponseMessage("User deleted successfully.");
        setIsFormVisible(false); // Hide form after success
      })
      .catch(error => {
        setResponseMessage(`Error deleting user: ${error.message}`);
      });
  };

  // Toggle delete confirmation
  const toggleDeleteConfirmation = () => {
    setConfirmDelete(!confirmDelete);
  };

  // Go back to the form after deleting or cancelling
  const goBackToForm = () => {
    setConfirmDelete(false);  // Hide the confirmation
    setIsFormVisible(true);   // Show the form again
    setUserID("");            // Reset User ID field
    setUserName("");          // Reset User Name field
    setResponseMessage("");   // Clear response message
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Response Message Display */}
      <Text style={styles.responseText}>{responseMessage}</Text>

      <View style={styles.card}>
        {isFormVisible && (
          <>
            {/* Input Fields for User ID and User Name */}
            <TextInput
              style={styles.inputField}
              placeholder="Enter User ID"
              value={userID}
              onChangeText={setUserID}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Enter User Name"
              value={userName}
              onChangeText={setUserName}
            />

            {/* Buttons for different API calls */}
            <View style={styles.buttonContainer}>
              <Button
                title="Fetch All Users"
                color="#4CAF50"
                onPress={callGetUsersList}
                style={styles.button}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Fetch User by ID"
                color="#2196F3"
                onPress={() => callGetUserById(userID)}
                style={styles.button}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Add User"
                color="#FF9800"
                onPress={callAddUser}
                style={styles.button}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Update User"
                color="#FF5722"
                onPress={callUpdateUser}
                style={styles.button}
              />
            </View>
          </>
        )}

        {/* Delete Confirmation and Button */}
        {confirmDelete && (
          <View style={styles.confirmDeleteContainer}>
            <Text style={styles.confirmDeleteText}>
              Are you sure you want to delete this user?
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Confirm Delete"
                color="#F44336"
                onPress={callDeleteUser}
                style={styles.button}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                color="#9E9E9E"
                onPress={goBackToForm} // Return to the form if cancelled
                style={styles.button}
              />
            </View>
          </View>
        )}

        {/* Back Button (Next to Delete Confirmation) */}
        {!confirmDelete && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={toggleDeleteConfirmation}>
              <Text style={styles.deleteButton}>Delete User</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Back Button */}
        {confirmDelete && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={goBackToForm}>
              <Text style={styles.backButton}>Back to Form</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    width: '90%',  // Card takes up most of the screen width
    marginTop: 20,
  },
  buttonContainer: {
    marginBottom: 10, // Reduces spacing between buttons
  },
  responseText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  inputField: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    fontSize: 16,
    borderRadius: 4,
  },
  confirmDeleteContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  confirmDeleteText: {
    fontSize: 18,
    color: '#D32F2F',
    marginBottom: 12,
    textAlign: 'center',
  },
  deleteButton: {
    fontSize: 16,
    color: '#F44336',
    textDecorationLine: 'underline',
  },
  backButton: {
    fontSize: 16,
    color: '#2196F3',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
    fontSize: 14, // Smaller text size
  },
});