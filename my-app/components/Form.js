import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import * as Icon from 'react-native-feather';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../slices/cartSlice';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function Form({
  nameError,
  phoneNumberError,
  addressError,
  handleNameChange,
  handleAddressChange,
  handlePhoneNumberChange,
  name,
  address,
  phoneNumber,
  handleSubmit,
}) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCancel = () => {
    navigation.navigate('Home');
    dispatch(emptyCart());
  };

  const { width, height } = useWindowDimensions();

  let paddings;
  if (width > 428) {
    paddings = ms(48);
  } else {
    paddings = ms(16);
  }

  let button;
  if (width > 428) {
    button = mvs(12);
  } else {
    button = mvs(15);
  }

  return (
    // container
    <>
      <View className="w-full   justify-end items-end">
        {/* BackButton */}
        <Animated.View entering={FadeInLeft.duration(500).springify()}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" items-center justify-center rounded-full shadow"
            style={{
              backgroundColor: colors.bgColor,
              width: mvs(40),
              height: mvs(40),
              marginRight: s(16),
            }}>
            <Icon.ArrowLeft
              width={mvs(24)}
              height={mvs(24)}
              strokeWidth={3}
              stroke={'white'}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View
        style={{
          marginTop: vs(20),
          paddingHorizontal: paddings,
        }}
        className="  flex-row justify-between items-center  ">
        {/* Description */}
        <Animated.View
          entering={FadeInRight.duration(500).springify()}
          className="flex-1">
          <Text style={styles(colors).descriptionTitle}>مشتری معلومات</Text>
          <Text style={{ fontSize: mvs(16), color: colors.text, marginTop: 5 }}>
            ستاسو تر کورونو پوری په ډیره چټکی سره
          </Text>
        </Animated.View>

        {/* Image */}
        <Animated.View
          entering={FadeInLeft.duration(500).springify()}
          className="flex-0">
          <Image
            style={styles(colors).descriptionImage}
            source={require('../assets/images/form.png')}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* formContainer */}
      <Animated.View
        entering={FadeInRight.duration(800).springify()}
        style={{
          paddingHorizontal: paddings,
        }}
        className=" justify-center items-center flex-1 ">
        {/* inputs */}

        <View style={{ gap: vs(25) }} className="w-full  ">
          {/* name */}
          <View className="w-full">
            {/* inputContainer */}
            <View
              className=" w-full  flex-row shadow-md"
              style={styles(colors, button).inputContainer}>
              <View className="pr-2.5   justify-center">
                <Icon.User
                  width={mvs(24)}
                  height={mvs(24)}
                  stroke={colors.text}
                />
              </View>
              <TextInput
                style={styles(colors).descriptionText}
                className=" text-right flex-1  "
                placeholderTextColor={nameError ? colors.bgColor : colors.text}
                placeholder={nameError ? 'نوم شتون مهم دی' : 'نوم'}
                value={name}
                onChangeText={handleNameChange}
              />
            </View>
          </View>

          {/* { address } */}

          <View>
            <View
              style={styles(colors, button).inputContainer}
              className=" w-full flex-row shadow-md">
              <View className="pr-2.5   justify-center">
                <Icon.MapPin
                  width={mvs(24)}
                  height={mvs(24)}
                  stroke={colors.text}
                />
              </View>
              <TextInput
                style={styles(colors).descriptionText}
                className="flex-1 text-right  "
                placeholderTextColor={nameError ? colors.bgColor : colors.text}
                placeholder={addressError ? 'ادرس شتون مهم دی' : 'ادرس'}
                value={address}
                onChangeText={handleAddressChange}
              />
            </View>
          </View>

          <View className="flex-row">
            <View
              className=" flex-1 flex-row shadow-md"
              style={styles(colors, button).inputContainer}>
              <View className="pr-2.5   justify-center">
                <Icon.Smartphone
                  width={mvs(24)}
                  height={mvs(24)}
                  stroke={colors.text}
                />
              </View>
              <TextInput
                style={styles(colors).descriptionText}
                className="flex-1 text-right  "
                placeholderTextColor={nameError ? colors.bgColor : colors.text}
                placeholder={
                  phoneNumberError ? 'د شماری شتون مهم دی' : 'د تیلیفون شماره'
                }
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="numeric"
                maxLength={9}
              />
            </View>
            <View
              className="items-center justify-center ml-2.5 shadow-md "
              style={styles(colors, button).inputContainer}>
              <Text
                style={{
                  color: colors.titleColor,
                  fontSize: mvs(14),
                  fontWeight: 'bold',
                }}>
                +93
              </Text>
            </View>
          </View>

          {/* buttons */}
          <View className="gap-y-5 ">
            <TouchableOpacity
              className="shadow-lg"
              style={{
                borderRadius: 20,
                paddingVertical: button,
                borderWidth: 1,
                borderColor: colors.borderColor,
                alignItems: 'center',
                shadowColor: colors.bgColor,
                backgroundColor: colors.bgColor,
              }}
              onPress={handleSubmit}>
              <Text
                style={{
                  fontSize: mvs(17),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: '#fff',
                }}>
                ارډر استول
              </Text>
            </TouchableOpacity>

            {/* second Toucable Opacity */}
            <TouchableOpacity
              onPress={handleCancel}
              className="shadow-md "
              style={styles(colors, button).nonButton}>
              <Text
                style={{
                  fontSize: mvs(17),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: colors.titleColor,
                }}>
                ردول
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const styles = (colors, button) =>
  ScaledSheet.create({
    button: {},
    nonButton: {
      borderRadius: 20,
      paddingVertical: button,
      borderWidth: 1,
      borderColor: colors.borderColor,
      alignItems: 'center',
      shadowColor: colors.shadowColor,
      backgroundColor: colors.searchBackground,
    },
    descriptionTitle: {
      color: colors.titleColor,
      fontSize: mvs(20),

      fontWeight: 'bold',
    },
    descriptionText: {
      color: colors.text,
      fontSize: mvs(14),
    },
    descriptionImage: {
      width: mvs(69),
      height: mvs(69),
      marginLeft: 10,
    },
    inputContainer: {
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: colors.borderColor,
      backgroundColor: colors.mainBackground,
      paddingHorizontal: s(20),
      paddingVertical: button,
      shadowColor: colors.shadowColor,
    },
    error: {
      color: colors.bgColor,
      fontSize: 12,
      marginTop: 5,
    },
  });
