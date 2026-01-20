import { MotiView } from 'moti';
import { Image, StyleSheet, Text, View } from 'react-native';

import logoSource from '../assets/logo.png';

/* ---------- AppLogo ---------- */
export function AppLogo() {
  return (
    <View style={styles.logoBox}>
      <Image
        source={logoSource}
        style={[styles.logo, { width: 150, height: 150 }]}
        resizeMode="cover"
      />
    </View>
  );
}

/* ---------- AppTitle ---------- */
export function AppTitle() {
  return <Text style={styles.title}>Medvault</Text>;
}

/* ---------- Tagline ---------- */
export function Tagline() {
  return (
    <Text style={styles.tagline}>
      Your Health, Secured & Organized
    </Text>
  );
}

/* ---------- LoadingDots ---------- */
export function LoadingDots() {
  return (
    <View style={styles.dots}>
      {[0, 1, 2].map((i) => (
        <MotiView
          key={i}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ loop: true, duration: 800, delay: i * 200 }}
          style={styles.dot}
        />
      ))}
    </View>
  );
}

/* ---------- WelcomeIcon ---------- */
export function WelcomeIcon() {
  return (
    <View style={styles.iconBox}>
      <Image
        source={logoSource}
        style={styles.welcomeLogo}
        resizeMode="contain"
      />
    </View>
  );
}

/* ---------- WelcomeTitle ---------- */
export function WelcomeTitle() {
  return <Text style={styles.welcomeTitle}>Welcome to Medvault</Text>;
}

/* ---------- WelcomeSubtitle ---------- */
export function WelcomeSubtitle() {
  return (
    <Text style={styles.subtitle}>
      Your secure medical records platform
    </Text>
  );
}

const styles = StyleSheet.create({
  /* ---------- Splash Logo ---------- */
  logoBox: {
    width: 150,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logo: {
    width: 120,
    height: 120,
  },

  /* ---------- Splash Text ---------- */
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#DBEAFE',
    textAlign: 'center',
  },

  /* ---------- Loading Dots ---------- */
  dots: { flexDirection: 'row', marginTop: 32 },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 6,
  },

  /* ---------- Welcome Screen ---------- */
  iconBox: {
    width: 100,
    height: 100,
    backgroundColor: '#2563EB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  welcomeLogo: {
    width: 90,
    height: 90,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
  },
});
