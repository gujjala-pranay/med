import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="otp" options={{ title: 'OTP Verification' }} />
      <Stack.Screen name="pin" options={{ title: 'PIN Setup' }} />
    </Stack>
  );
}
