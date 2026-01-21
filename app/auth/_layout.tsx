import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" options={{ title: "Login" }} />
      <Stack.Screen name="OTPScreen" options={{ title: "OTP Verification" }} />
      <Stack.Screen name="PINSetupScreen" options={{ title: "PIN Setup" }} />
    </Stack>
  );
}
