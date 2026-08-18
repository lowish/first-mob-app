import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Fonts, Palette, Radius } from '@/constants/theme';

type FieldName = 'email' | 'password';

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState<FieldName | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Wire these three to your auth flow.
  const signIn = () => {};
  const forgotPassword = () => {};
  const signUp = () => {};

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.column}>
          <LogoMark />

          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.subheading}>Sign in to pick up where you left off.</Text>

          <View style={styles.form}>
            <View style={styles.group}>
              <Text style={styles.label}>Email</Text>
              <View style={[styles.field, focused === 'email' && styles.fieldFocused]}>
                <TextInput
                  style={styles.input}
                  accessibilityLabel="Email"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  placeholderTextColor={Palette.mist}
                  selectionColor={Palette.ink}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  submitBehavior="submit"
                />
              </View>
            </View>

            <View style={styles.group}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.field, focused === 'password' && styles.fieldFocused]}>
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  accessibilityLabel="Password"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter your password"
                  placeholderTextColor={Palette.mist}
                  selectionColor={Palette.ink}
                  secureTextEntry={!revealed}
                  textContentType="password"
                  autoComplete="current-password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="go"
                  onSubmitEditing={signIn}
                />
                <Pressable
                  onPress={() => setRevealed((shown) => !shown)}
                  style={styles.reveal}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={revealed ? 'Hide password' : 'Show password'}>
                  <Text style={styles.revealLabel}>{revealed ? 'Hide' : 'Show'}</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              onPress={forgotPassword}
              style={styles.forgot}
              hitSlop={8}
              accessibilityRole="button">
              {({ pressed }) => (
                <Text style={[styles.forgotLabel, pressed && styles.dimmed]}>Forgot Password?</Text>
              )}
            </Pressable>
          </View>

          <Pressable
            onPress={signIn}
            accessibilityRole="button"
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
            <Text style={styles.buttonLabel}>Sign In</Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>
            <Pressable onPress={signUp} hitSlop={8} accessibilityRole="button">
              {({ pressed }) => (
                <Text style={[styles.footerLink, pressed && styles.dimmed]}>Sign Up</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/**
 * The mark: an ink squircle holding a white ring that breaks at the top-right,
 * with a single dot resting in the gap — an orbit arriving back at its origin.
 */
function LogoMark() {
  return (
    <View style={styles.tile}>
      <View style={styles.orbit}>
        <View style={styles.ring} />
        <View style={styles.ringBreak} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.paper,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  column: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    paddingHorizontal: 28,
  },

  // Logo
  tile: {
    width: 66,
    height: 66,
    borderRadius: Radius.tile,
    backgroundColor: Palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Palette.ink,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  orbit: {
    width: 30,
    height: 30,
  },
  ring: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: Palette.paper,
  },
  ringBreak: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 15,
    height: 15,
    backgroundColor: Palette.ink,
  },
  dot: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Palette.paper,
  },

  // Type
  heading: {
    marginTop: 34,
    fontFamily: Fonts.sans,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: -1.1,
    color: Palette.ink,
  },
  subheading: {
    marginTop: 10,
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 22,
    color: Palette.slate,
  },

  // Fields
  form: {
    marginTop: 38,
  },
  group: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 9,
    marginLeft: 2,
    fontFamily: Fonts.sans,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: Palette.mist,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: Radius.field,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: Palette.fill,
  },
  fieldFocused: {
    borderColor: Palette.ink,
    backgroundColor: Palette.paper,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 18,
    paddingVertical: 0,
    fontFamily: Fonts.sans,
    fontSize: 16,
    color: Palette.ink,
  },
  reveal: {
    paddingHorizontal: 18,
  },
  revealLabel: {
    fontFamily: Fonts.sans,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Palette.slate,
  },
  forgot: {
    alignSelf: 'flex-end',
    paddingVertical: 2,
  },
  forgotLabel: {
    fontFamily: Fonts.sans,
    fontSize: 13.5,
    fontWeight: '500',
    color: Palette.graphite,
  },

  // Action
  button: {
    marginTop: 30,
    height: 56,
    borderRadius: Radius.field,
    backgroundColor: Palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: Palette.graphite,
  },
  buttonLabel: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: Palette.paper,
  },

  // Footer
  footer: {
    marginTop: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  footerText: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    color: Palette.slate,
  },
  footerLink: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    fontWeight: '700',
    color: Palette.ink,
  },
  dimmed: {
    opacity: 0.5,
  },
});
