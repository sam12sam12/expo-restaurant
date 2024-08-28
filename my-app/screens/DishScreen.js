import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { urlFor } from '../sanity';
import { useTheme } from '../ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from '../slices/cartSlice';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import BackgroundImage from '../components/BackgroundImage';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function DishScreen({ route }) {
  const { width, height } = useWindowDimensions();
  const { colors } = useTheme();
  const { dish } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const totalItems = useSelector((state) =>
    selectCartItemsById(state, dish._id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ ...dish }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ id: dish._id }));
  };
  const handleNavigate = () => {
    if (totalItems.length > 0) {
      navigation.goBack();
    }
  };

  return (
    <BackgroundImage>
      <View style={{ flex: 1, backgroundColor: colors.screenBackground }}>
        <View
          style={{
            paddingTop: StatusBar.currentHeight + 20,
            paddingHorizontal: s(16),
            flex: 1,
          }}>
          <View className="w-full  justify-end items-end">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon.ChevronLeft strokeWidth={3} stroke={colors.titleColor} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: vs(40) }} className="">
            <View className="w-full items-center ">
              <Image
                style={{
                  height: mvs(200),
                  width: mvs(200),
                  elevation: 20,

                  resizeMode: 'contain',
                }}
                source={{ uri: urlFor(dish.image).url() }}
              />

              <View
                style={{
                  backgroundColor: colors.bgColor,
                  padding: 10,
                  borderRadius: 50,
                  shadowColor: 'white',
                  marginTop: vs(20),
                  elevation: 15,
                  shadowColor: 'red',
                }}
                className="justify-center flex-row  items-center  ">
                {/* PlusIcon */}
                <TouchableOpacity
                  onPress={handleAddToCart}
                  style={{
                    backgroundColor: colors.bgColor,
                  }}
                  className="rounded-full items-center justify-center   ">
                  <Icon.Plus
                    stroke={'white'}
                    width={ms(20)}
                    height={ms(20)}
                    strokeWidth={3}
                  />
                </TouchableOpacity>

                {/* slectedItemsNumber */}
                <Text
                  className="mx-3"
                  style={{
                    color: 'white',
                    fontSize: ms(13),
                    fontWeight: 'bold',
                  }}>
                  {totalItems.length}
                </Text>

                {/* Minus Icon */}
                <TouchableOpacity
                  disabled={!totalItems.length}
                  onPress={handleRemoveFromCart}
                  style={{
                    backgroundColor: colors.bgColor,
                    shadowColor: colors.bgColor,
                  }}
                  className="items-center justify-center rounded-full shadow-lg ">
                  <Icon.Minus
                    stroke={'#fff'}
                    width={ms(20)}
                    height={ms(20)}
                    strokeWidth={3}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                padding: s(16),
                backgroundColor: colors.mainBackground,
                elevation: 15,
                shadowColor: colors.shadowColor,
                borderRadius: 20,
                marginTop: vs(40),
                borderWidth: 0.5,
                borderColor: colors.borderColor,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: mvs(26),
                    fontWeight: 'bold',
                    color: colors.titleColor,
                    // textAlign: 'center',
                  }}>
                  {dish.name}
                </Text>
                <Text
                  style={{
                    fontSize: mvs(16),
                    marginTop: vs(12),
                    color: colors.text,
                    // textAlign: 'center',
                  }}>
                  د افغان ریستورانت د خوندورو خوړو څخه خوند واخلی موږ تاسو ته
                  وړاندی کوو خواړه د مختلفو خوندونو سره
                </Text>
              </View>
              <View
                style={{ marginTop: vs(12) }}
                className="flex-row items-center  justify-end">
                {/* coinImage */}
                <Text
                  style={{
                    color: colors.titleColor,
                    fontSize: mvs(26),
                    fontWeight: 700,
                    marginRight: ms(3),
                    // lineHeight: 16,
                  }}>
                  {dish.price}
                </Text>
                <Image
                  style={{
                    width: ms(30),
                    height: ms(30),
                  }}
                  source={require('../assets/images/afghani.png')}
                />

                {/* itemPrice */}
              </View>
              <TouchableOpacity
                onPress={handleNavigate}
                style={{
                  backgroundColor: colors.bgColor,
                  borderRadius: 50,
                  alignItems: 'center',
                  elevation: 10,
                  shadowColor: 'red',
                  paddingVertical: mvs(15),
                  marginTop: vs(24),
                }}>
                <Text
                  style={{
                    fontSize: mvs(17),
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  اضافه کول
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </BackgroundImage>
  );
}
