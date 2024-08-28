import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import RestuarantScreen from './screens/RestuarantScreen';
import CartScreen from './screens/CartScreen';
import RestaurantListScreen from './screens/RestaurantListScreen';
import SearchScreen from './screens/SearchScreen';
import FormScreen from './screens/FormScreen';
import DishScreen from './screens/DishScreen';
import OrderPreparingScreen from './screens/OrderPreparingScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import * as Icon from 'react-native-feather';
import DrawerContent from './components/DrawerContent';
import { ImageBackground, View, useWindowDimensions } from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen';
import ThemeScreen from './screens/ThemeScreen';
import BackgroundImage from './components/BackgroundImage';
import { useTheme } from './ThemeContext';
import { getItem } from './utils/AsyncStorageMethods';
import SplashScreen from './screens/SplashScreen';
import { CardStyleInterpolators } from '@react-navigation/native';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [initialRoute, setInitialRoute] = useState('Onboarding');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingDone = await getItem('onboardingDone');
        if (onboardingDone === 'true') {
          setInitialRoute('Splash');
          console.log('onBoarding is Done', onboardingDone, initialRoute);
        }
      } catch (error) {
        console.log('Error while fetching onboarding status:', error);
      } finally {
        setIsReady(true); // Set isReady to true after checking onboarding status
      }
    };

    checkOnboardingStatus();
  }, []);

  console.log('initialRoute:', initialRoute);

  if (!isReady) {
    return null; // Render nothing until isReady is true
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // Set the animation property
        }}
        initialRouteName={initialRoute}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Home" component={DrawerNavigation} />
        <Stack.Screen name="Restuarant" component={RestuarantScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="FormScreen" component={FormScreen} />
        <Stack.Screen name="Dish" component={DishScreen} />

        <Stack.Screen
          name="OrderPreparing"
          options={{ presentation: 'fullScreenModal' }}
          component={OrderPreparingScreen}
        />
        <Stack.Screen
          name="Delivery"
          options={{ presentation: 'fullScreenModal' }}
          component={DeliveryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigation() {
  const { colors, activeTheme } = useTheme();

  const { width } = useWindowDimensions();
  let drawerH;
  if (width > 428) {
    drawerH = 0.6;
  } else {
    drawerH = 0.8;
  }

  let paddingV;
  if (width > 428) {
    paddingV = s(20);
  } else {
    7;
    paddingV = s(10);
  }
  // Function to get the appropriate icon based on the active theme
  const getIconForTheme = (focused, color) => {
    const iconColor = focused ? 'white' : color;

    switch (activeTheme) {
      case 'light':
        return <Icon.Sun width={mvs(24)} height={mvs(24)} stroke={iconColor} />;
      case 'dark':
        return (
          <Icon.Moon width={mvs(24)} height={mvs(24)} stroke={iconColor} />
        );
      case 'blur':
        return (
          <Icon.Cloud width={mvs(24)} height={mvs(24)} stroke={iconColor} />
        );
      default:
        return null;
    }
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <BackgroundImage>
            <View style={{ flex: 1, backgroundColor: colors.screenBackground }}>
              <View className="flex-1">
                <DrawerContent />
                <View
                  style={{
                    paddingHorizontal: paddingV,
                  }}>
                  <DrawerItemList {...props} />
                </View>
              </View>
            </View>
          </BackgroundImage>
        );
      }}
      screenOptions={{
        drawerActiveBackgroundColor: '#F55A51',
        drawerInactiveBackgroundColor: colors.mainBackground,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: colors.text,
        drawerItemStyle: {
          borderRadius: 20,
          borderWidth: 0.5,
          borderColor: colors.borderColor,
          paddingVertical: 3,
          paddingHorizontal: s(10),
          elevation: 5,
          shadowColor: colors.shadowColor,
        },
        drawerLabelStyle: {
          fontSize: mvs(14),
        },
        drawerStyle: {
          width: drawerH * width,
        },
      }}>
      <Drawer.Screen
        name="Homee"
        component={HomeScreen} // Change component to TabNavigation
        options={({ focused }) => ({
          headerShown: false,
          drawerLabel: 'اصلی پاڼه',
          drawerIcon: ({ color, size }) => (
            <Icon.Home
              width={mvs(24)}
              height={mvs(24)}
              stroke={focused ? 'white' : color} // Change stroke color based on focus
            />
          ),
        })}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen} // Change component to TabNavigation
        options={({ focused }) => ({
          headerShown: false,
          drawerLabel: 'زموږ په باره کی',
          drawerIcon: ({ color }) => (
            <Icon.Info
              width={mvs(24)}
              height={mvs(24)}
              stroke={focused ? 'white' : color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Theme"
        component={ThemeScreen} // Change component to TabNavigation
        options={({ focused }) => ({
          headerShown: false,
          drawerLabel: 'بڼه',
          drawerIcon: ({ color }) => getIconForTheme(focused, color),
        })}
      />
    </Drawer.Navigator>
  );
}
