import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator, FlatList } from 'react-native';

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
        console.log(data);
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

  const renderIntruderCard = ({ item }) => (
    <View style={styles.intruderCard}>
      <Image 
        source={{ uri: item.image_path }} 
        style={styles.image} 
        alt={`Intruder ${item.track_id}`} 
      />
      <Text style={styles.details}>Tracker ID: {item.track_id}</Text>
      <Text style={styles.details}>Detection Time: {item.time}</Text>
      <Text style={styles.details}>Frame: {item.frame}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : intruderDetails.length > 0 ? (
        <FlatList
          data={intruderDetails}
          renderItem={renderIntruderCard}
          keyExtractor={(item) => item.track_id.toString()}
          numColumns={2} // Number of columns in the grid
          columnWrapperStyle={styles.row} // Style for the rows
          contentContainerStyle={styles.gridContainer}
        />
      ) : (
        <Text style={styles.noDataText}>No Intruder Data Available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  gridContainer: {
    paddingBottom: 20, // Padding at the bottom
  },
  row: {
    justifyContent: 'space-between', // Space between cards
  },
  intruderCard: {
    marginBottom: 20, // Space between rows
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Card background color
    borderRadius: 10, // Border radius for rounded corners
    padding: 15, // Padding inside the card
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginRight:15,
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Android shadow
    // width: '48%', // Ensure the card takes up 48% of the width for two columns
  },
  image: {
    width: '100%', // Make the image responsive
    height: 150, // Fixed height for cards
    resizeMode: 'contain',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center', // Center text
  },
  noDataText: {
    fontSize: 18,
    color: '#888', // Gray color for no data message
    textAlign: 'center',
  },
});

export default WatchPage;
