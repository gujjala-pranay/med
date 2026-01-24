import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";

interface OTPScreenProps {
  mobileNumber?: string;
  onVerify?: (otp: string) => void;
  onResendOTP?: () => void;
}

export default function OTPScreen({
  mobileNumber: propMobileNumber,
  onVerify,
  onResendOTP,
}: OTPScreenProps) {
  const { mobile: paramMobile } = useLocalSearchParams();
  const mobileNumber = propMobileNumber || (paramMobile as string) || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOTPChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = `otp-${index + 1}`;
        // In real implementation, you'd use refs to focus next input
      }

      // Auto-verify when all digits are entered
      if (newOTP.every((digit) => digit.length === 1)) {
        setTimeout(() => {
          if (onVerify) {
            onVerify(newOTP.join(""));
          } else {
            // Navigate using router
            router.push("/auth/PINSetupScreen");
          }
        }, 100);
      }
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      setCanResend(false);
      setTimeLeft(30);
      setOtp(["", "", "", "", "", ""]);
      if (onResendOTP) {
        onResendOTP();
      }
    }
  };

  const formatMobileNumber = (number: string) => {
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1F2937" />
          </Pressable>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to {formatMobileNumber(mobileNumber)}
          </Text>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOTPChange(value, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              secureTextEntry
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            {canResend
              ? "Didn't receive the code?"
              : `Resend code in ${timeLeft}s`}
          </Text>
          {canResend && (
            <Pressable onPress={handleResendOTP}>
              <Text style={styles.resendLink}>Resend OTP</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Having trouble? Contact support at help@medvault.app
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    marginBottom: 48,
  },
  backButton: {
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 24,
    color: "#1F2937",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    backgroundColor: "#F9FAFB",
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  resendText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
