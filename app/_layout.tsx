import { AuthProvider } from '@/src/context/authContext';
import { ThemeProvider } from '@/src/context/themeContext';
import { UserProvider } from '@/src/context/userContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
