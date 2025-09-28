import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { router, Stack } from 'expo-router';

const { height } = Dimensions.get('window');

const COLORS = {
  primary: '#7B42F6', 
  secondary: '#A5B5FF', 
  background: '#FFFFFF', 
  textDark: '#333333',
  textLight: '#FFFFFF',
  inputBackground: '#F0F3FF',
  wavePrimary: '#7B42F6',
  waveSecondary: '#A5B5FF',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignIn = () => {
    console.log("Sign In clicked");
    router.replace('/(tabs)/App'); 
  };

  const handleSignUp = () => {
    router.push('/(tabs)/SkillSelectionScreen');
  };

  return (
    <>
      {/* ✅ This removes the white header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <StatusBar barStyle="light-content" backgroundColor={COLORS.wavePrimary} />
        
        {/* Decorative Wave Background (Purple) */}
        <View style={styles.decorativeTopWave} />
        {/* Secondary Wave (Blue/Purple blend) */}
        <View style={styles.decorativeSecondaryWave} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign in to your Registered Account.</Text>

          {/* --- Card Container for Form --- */}
          <View style={styles.card}>
            
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="************"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.toggleButton}
                >
                  <Text style={{ color: COLORS.primary, fontSize: 14 }}>
                    {isPasswordVisible ? 'HIDE' : 'SHOW'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              {/* SIGN UP Button */}
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]} 
                onPress={handleSignUp}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>SIGN UP</Text>
              </TouchableOpacity>

              {/* SIGN IN Button */}
              <TouchableOpacity 
                style={[styles.button, styles.primaryButton]} 
                onPress={handleSignIn} 
              >
                <Text style={[styles.buttonText, styles.primaryButtonText]}>SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  decorativeTopWave: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height * 0.45,
    backgroundColor: COLORS.wavePrimary,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  decorativeSecondaryWave: {
    position: 'absolute',
    top: -50,
    width: '100%',
    height: height * 0.4,
    backgroundColor: COLORS.waveSecondary,
    opacity: 0.6,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
  },
  contentContainer: {
    flex: 1,
    paddingTop: height * 0.15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 40,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: 30,
    padding: 25,
    shadowColor: COLORS.textDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: COLORS.textDark,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: COLORS.textDark,
  },
  toggleButton: {
    paddingRight: 20,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  secondaryButton: {
    backgroundColor: COLORS.inputBackground,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: COLORS.textLight,
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
});
