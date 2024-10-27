// App.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/Pages/LoginSignUp/LoginSignUp'; // Adjust the path as needed
import Dashboard from '@/Pages/DashBoard/DashBoard'; // Adjust the path as needed
import NewProject from '@/Pages/NewProject/NewProject'; // Adjust the path as needed
import NavBar from '@/Components/NavBar/NavBar'; // Adjust the path as needed
import { VideoProvider } from './Context/videoProvider'; // Adjust the path as needed
import videoProcess from './Pages/videoProcess/videoProcess'; // Adjust the path as needed
import { RootStackParamList } from './Pages/types'; // Adjust the path as needed
import WatchPage from './Pages/WatchPage/WatchPage'; // Adjust the path as needed

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to check user token:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <VideoProvider>
      <NavigationContainer>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.nav}>
            {isLoggedIn ? <NavBar /> : null}
          </View>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen name="Dashboard" component={Dashboard} />
            ) : (
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
              </Stack.Screen>
            )}
            <Stack.Screen name="NewProject" component={NewProject} />
            <Stack.Screen name="videoProcess" component={videoProcess} />
            <Stack.Screen name="WatchPage" component={WatchPage} />
          </Stack.Navigator>
        </ScrollView>
      </NavigationContainer>
    </VideoProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1, // Allows the ScrollView to expand
  },
  nav: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
});

export default App;
