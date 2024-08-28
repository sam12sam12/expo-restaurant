import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Linking,
  Share,
} from 'react-native';
import React from 'react';
import BackgroundImage from '../components/BackgroundImage';
import { useTheme } from '../ThemeContext';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function AboutScreen() {
  const { width, height } = useWindowDimensions();
  let iconSize;

  if (width > 428) {
    iconSize = mvs(29);
  } else {
    iconSize = mvs(35);
  }
  const navigation = useNavigation();
  const { colors } = useTheme();

  const openWhatsApp = () => {
    Linking.openURL('https://api.whatsapp.com/send?text=Hello');
  };

  const openTwitter = () => {
    Linking.openURL('https://twitter.com/');
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/');
  };

  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing app!',
        url: 'https://example.com',
        title: 'Share App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <BackgroundImage>
      <View
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight + vs(20),
          backgroundColor: colors.screenBackground,
        }}>
        <View
          style={{
            paddingHorizontal: s(16),
          }}
          className="flex-row justify-between items-center ">
          {/* JustifyIcon */}
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{
              backgroundColor: colors.mainBackground,
              borderRadius: 10,
              shadowColor: colors.shadowColor,
              padding: mvs(5),
            }}
            className=" shadow-md  ">
            <Icon.BarChart2
              style={{
                transform: [{ rotate: '270deg' }],
              }}
              height={iconSize}
              width={iconSize}
              strokeWidth={1.5}
              stroke={colors.titleColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" items-center justify-center rounded-full ">
            <Icon.ArrowLeft
              width={mvs(24)}
              height={mvs(24)}
              strokeWidth={3}
              stroke={colors.text}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: vs(20),
          }}>
          <TouchableOpacity onPress={openWhatsApp}>
            <Icon.MessageCircle
              width={iconSize}
              height={iconSize}
              stroke={colors.titleColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openTwitter}>
            <Icon.Twitter
              width={iconSize}
              height={iconSize}
              stroke={colors.titleColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openFacebook}>
            <Icon.Facebook
              width={iconSize}
              height={iconSize}
              stroke={colors.titleColor}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={shareContent}>
            <Icon.Share2
              width={iconSize}
              height={iconSize}
              stroke={colors.titleColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundImage>
  );
}

const styles = (colors) =>
  StyleSheet.create({
    topElements: {
      position: 'fixed',
      top: 10,
      left: 0,
    },
    descriptionTitle: {
      color: colors.titleColor,
      fontSize: 16,
      fontWeight: 'bold',
    },
    descriptionText: {
      color: colors.text,
      fontSize: 14,
    },
    descriptionImage: {
      height: 46,
      width: 80,
    },
  });
