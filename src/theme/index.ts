export const Colors = {
  // Brand & High-Contrast (Subtle Professional)
  primary: '#0F172A', // Deep Slate Navy
  secondary: '#334155', // Slate Grey
  accent: '#10B981', // Emerald Green (Success & AI)
  
  // Neutral / Backgrounds
  background: '#F8FAFC',
  white: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  
  // Status Colors (Refined)
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  error: '#EF4444',   // Rose/Red
  info: '#3B82F6',    // Blue
  
  // Glassmorphism Utility (Professional Refinement)
  glassBg: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.4)',
  overlay: 'rgba(15, 23, 42, 0.5)', // Navy-tinted overlay
  
  border: '#E2E8F0',
  surface: '#FFFFFF',
  card: '#FFFFFF',
};

export const Shadows = {
  // Ultra-Premium Soft Depth System
  light: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  medium: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  dark: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 32 },
    shadowOpacity: 0.12,
    shadowRadius: 64,
    elevation: 16,
  },
  glass: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
  }
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '800' as '800', letterSpacing: -1 },
  h2: { fontSize: 26, fontWeight: '700' as '700', letterSpacing: -0.5 },
  h3: { fontSize: 20, fontWeight: '600' as '600', letterSpacing: -0.2 },
  body: { fontSize: 16, fontWeight: '400' as '400', lineHeight: 24 },
  caption: { fontSize: 13, fontWeight: '600' as '600', color: '#64748B', letterSpacing: 0.5 },
  button: { fontSize: 16, fontWeight: '700' as '700', letterSpacing: 0.5 },
};

