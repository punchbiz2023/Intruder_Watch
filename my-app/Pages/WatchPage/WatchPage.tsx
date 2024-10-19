import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, ScrollView } from 'react-native';

const WatchPage = () => {
  const [intruderDetails, setIntruderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntruderData = async () => {
      try {
        // Fetch the intruder logs from your Flask backend API
        const response = await fetch('http://127.0.0.1:8000/intruders'); // Update URL to point to the correct endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Check if response is okay
        }
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setIntruderDetails(data); // Store the intruder logs in state
        } else {
          console.error('Invalid intruder data:', data);
        }
      } catch (error) {
        console.error('Error fetching intruder logs:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the fetch completes
      }
    };

    fetchIntruderData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : intruderDetails.length > 0 ? (
        intruderDetails.map((intruder, index) => (
          <View key={index} style={styles.intruderContainer}>
            <Image 
              source={{ uri: intruder.image_path }} 
              style={styles.image} 
              alt={`Intruder ${intruder.track_id}`} 
            />
            <Text style={styles.details}>Tracker ID: {intruder.track_id}</Text>
            <Text style={styles.details}>Detection Time: {intruder.time}</Text>
            <Text style={styles.details}>Frame: {intruder.frame}</Text>
          </View>
        ))
      ) : (
        <Text>No Intruder Data Available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  intruderContainer: {
    marginBottom: 30, // Add spacing between intruder entries
    alignItems: 'center',
    display: "flex",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default WatchPage;
