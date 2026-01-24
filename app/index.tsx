import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import DisclaimerScreen from "./components/DisclaimerScreen";
import PrivacyScreen from "./components/PrivacyScreen";
import TermsScreen from "./components/TermsScreen";
import OnboardingFlow from "./onboarding/index";
import SplashScreen from "./SplashScreen";

export default function Index() {
  const [authState, setAuthState] = useState<
    "splash" | "disclaimer" | "terms" | "privacy" | "onboarding"
  >("splash");

  useEffect(() => {
    init();
  }, []);

  const clearStorage = async () => {
    try {
      console.log("Clearing AsyncStorage...");
      await AsyncStorage.removeItem("disclaimerAccepted");
      await AsyncStorage.removeItem("onboardingComplete");
      await AsyncStorage.removeItem("isLoggedIn");
      console.log("AsyncStorage cleared!");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  const init = async () => {
    // Force clear storage for testing to ensure onboarding/login shows
    // You can comment this out once you've verified the flow
    await clearStorage();

    const disclaimerAccepted = await AsyncStorage.getItem("disclaimerAccepted");
    const onboardingComplete = await AsyncStorage.getItem("onboardingComplete");
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

    // Add delay to ensure screens are visible before navigation
    setTimeout(() => {
      if (disclaimerAccepted !== "true") {
        setAuthState("disclaimer");
      } else if (onboardingComplete !== "true") {
        setAuthState("onboarding");
      } else if (isLoggedIn !== "true") {
        setAuthState("splash");
        setTimeout(() => {
          router.replace("/auth/AuthOptionsScreen");
        }, 500);
      } else {
        setAuthState("splash");
        setTimeout(() => {
          router.replace("/(tabs)/dashboard");
        }, 500);
      }
    }, 1500); // Ensure splash shows for 1.5 seconds
  };

  const handleDisclaimerAccept = async () => {
    await AsyncStorage.setItem("disclaimerAccepted", "true");
    setAuthState("onboarding");
  };

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    setAuthState("splash"); // Show splash briefly before navigation
    setTimeout(() => {
      router.replace("/auth/AuthOptionsScreen");
    }, 1000); // 1 second delay before login
  };

  const handleShowTerms = () => setAuthState("terms");
  const handleShowPrivacy = () => setAuthState("privacy");
  const handleBackToDisclaimer = () => setAuthState("disclaimer");

  // Render different screens based on auth state
  switch (authState) {
    case "splash":
      return <SplashScreen />;

    case "disclaimer":
      return (
        <DisclaimerScreen
          onAccept={handleDisclaimerAccept}
          onShowTerms={handleShowTerms}
          onShowPrivacy={handleShowPrivacy}
        />
      );

    case "terms":
      return <TermsScreen onBack={handleBackToDisclaimer} />;

    case "privacy":
      return <PrivacyScreen onBack={handleBackToDisclaimer} />;

    case "onboarding":
      return <OnboardingFlow onComplete={handleOnboardingComplete} />;

    default:
      return <SplashScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
});
