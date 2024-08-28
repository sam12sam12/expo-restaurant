import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Icon from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { emptyCart } from '../slices/cartSlice';
import { useTheme } from '../ThemeContext';

export default function DeliveryScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  // In DeliveryScreen
  const restaurant = useSelector(selectRestaurant);
  const dispatch = useDispatch();

  const cancelOrder = () => {
    navigation.navigate('Home');
    dispatch(emptyCart());
  };
  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        mapType="standard"
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={colors.bgColor}
        />
      </MapView>
      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg font-semibold text-gray-700">
              Estimate Arrival
            </Text>
            <Text className="text-3xl text-gray-700 font-semibold">
              20-30 minutes
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              You Order Is On The Way
            </Text>
          </View>

          <Image
            className="w-24 h-24"
            source={require('../assets/images/bikeGuy2.gif')}
          />
        </View>
        <View
          className="flex-row justify-between items-center p-2 mx-2 my-5 rounded-full"
          style={{ backgroundColor: colors.bgColor }}
        >
          <View
            style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
            className="rounded-full p-1"
          >
            {/* <Image
              className="w-16 h-16 rounded-full"
              source={require('../assets/images/deliveryGuy.png')}
            /> */}
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-lg text-white font-bold">AbdulSami</Text>
            <Text className=" text-white font-semibold">Your Rider</Text>
          </View>
          <View className="flex-row items-center mr-3 space-x-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              <Icon.Phone
                fill={colors.bgColor}
                stroke={colors.bgColor}
                strokeWidth={1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={cancelOrder}
              className="bg-white p-2 rounded-full"
            >
              <Icon.X stroke="red" strokeWidth={5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
