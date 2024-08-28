import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { removeItem, setItem } from '../utils/AsyncStorageMethods';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const skipButton = ({ ...props }) => (
    <TouchableOpacity style={styles.skipButton} {...props}></TouchableOpacity>
  );

  const nextButton = ({ ...props }) => (
    <TouchableOpacity style={styles.nextButton} {...props}></TouchableOpacity>
  );

  const handleDone = async () => {
    try {
      await setItem('onboardingDone', 'true'); // Save completion status to AsyncStorage
      navigation.navigate('Home'); // Navigate to Home screen
    } catch (error) {
      console.log('Error handling onboarding completion:', error);
    }
  };

  return (
    <>
      <StatusBar />
      <View className="flex-1">
        <Onboarding
          // DoneButtonComponent={doneButton}
          onDone={handleDone}
          bottomBarHighlight={false}
          SkipButtonComponent={skipButton}
          NextButtonComponent={nextButton}
          containerStyles={{ paddingHorizontal: 15 }}
          pages={[
            {
              backgroundColor: '#1dbf73',
              image: (
                <View>
                  <Image
                    style={{
                      width: hp(50),
                      height: hp(50),
                    }}
                    source={require('../assets/images/restaurant.png')}
                  />
                </View>
              ),
              title: 'ښکلی چاپیریال',
              subtitle:
                'تاسو کولاس سی چی د افغان ریستورانت د مجهز چاپیریال ځخه ګټه واخلی',
              titleStyles: { fontSize: 25, fontWeight: 'bold' },
              subTitleStyles: { fontSize: 16 },
            },
            {
              backgroundColor: '#fef3c7',
              image: (
                <View>
                  <Image
                    style={{
                      width: hp(50),
                      height: hp(50),
                    }}
                    source={require('../assets/images/foods.png')}
                  />
                </View>
              ),
              title: 'مختلف خواړه',
              subtitle:
                'د افغان ریستورانت د خوندورو خوړو څخه خوند واخلی کیفیت زموږ باور ستاسو',
              titleStyles: { fontSize: 25, fontWeight: 'bold' },
              subTitleStyles: { fontSize: 16 },
            },
            {
              backgroundColor: 'coral',
              image: (
                <View>
                  <Image
                    style={{
                      width: hp(50),
                      height: hp(50),
                    }}
                    source={require('../assets/images/chefs.png')}
                  />
                </View>
              ),
              title: 'تجربه ناک اشپزان',
              subtitle:
                ' په پوره توجو او د مشتریانو په فرمایش خواړه برابروی د ډیر احتیاظ سره',
              titleStyles: { fontSize: 25, fontWeight: 'bold' },
              subTitleStyles: { fontSize: 16 },
            },
            {
              backgroundColor: '#eee',
              image: (
                <View>
                  <Image
                    style={{
                      width: hp(50),
                      height: hp(50),
                    }}
                    source={require('../assets/images/map.png')}
                  />
                </View>
              ),
              title: 'د رسونی خدمات',
              subtitle:
                ' په پوره توجو او د مشتریانو په فرمایش خواړه برابروی د ډیر احتیاظ سره',
              titleStyles: { fontSize: 25, fontWeight: 'bold' },
              subTitleStyles: { fontSize: 16 },
            },
          ]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  doneButton: {
    paddingRight: 20,
  },
  skipButton: {
    paddingLeft: 20,
    opacity: 0,
  },
  nextButton: {
    paddingRight: 20,
    opacity: 0,
  },
});
