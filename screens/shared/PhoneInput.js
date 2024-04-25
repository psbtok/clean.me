import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-international-phone-number';
import { colors } from '../../constants/colors.js'; // Assuming you have a colors file

const CustomPhoneInput = ({ phoneNumber, setPhoneNumber, selectedCountry, setSelectedCountry, isValidPhoneNumber }) => {
  return (
    <View style={styles.container}>
      <PhoneInput
        value={phoneNumber}
        onChangePhoneNumber={setPhoneNumber}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={setSelectedCountry}
        defaultValue="+7"
        customMask={['(###) ###-##-##']}
        language="ru"
        placeholder="(___) ___-__-__"
        phoneInputStyles={{
            container: {
              backgroundColor: 'white',
              height: 54,
            },
            flagContainer: {
              borderTopLeftRadius: 7,
              borderBottomLeftRadius: 7,
              backgroundColor: 'white',
              justifyContent: 'center',
            },
            callingCode: {
              fontSize: 16,
              fontWeight: 'regular',
              color: colors.grey3,
            },
            input: {
              marginLeft: -30,
              color: colors.grey3,
            },
          }}
          modalStyles={{
            modal: {
              backgroundColor: '#333333',
              borderWidth: 1,
            },
            backdrop: {},
            divider: {
              backgroundColor: 'transparent',
            },
            countriesList: {},
            searchInput: {
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#F3F3F3',
              color: '#F3F3F3',
              backgroundColor: '#333333',
              paddingHorizontal: 12,
              height: 46,
            },
            countryButton: {
              borderWidth: 1,
              borderColor: '#F3F3F3',
              backgroundColor: '#666666',
              marginVertical: 4,
              paddingVertical: 0,
            },
            noCountryText: {},
            noCountryContainer: {},
            flag: {
              color: '#FFFFFF',
              fontSize: 20,
            },
            callingCode: {
              color: '#F3F3F3',
            },
            countryName: {
              color: '#F3F3F3',
            },
          }}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default CustomPhoneInput;
