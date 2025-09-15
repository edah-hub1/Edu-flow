/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Angular templates + TS
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: {
          DEFAULT: "#1E3A8A", // Deep Blue
          light: "#3B82F6",   // Bright Indigo (CTA)
          dark: "#1E40AF",
        },

        //  Success / Progress
        success: {
          DEFAULT: "#10B981", // Emerald Green
          light: "#34D399",
          dark: "#059669",
        },

        // Warning
        warning: {
          DEFAULT: "#F59E0B", // Amber
          light: "#FBBF24",
          dark: "#D97706",
        },

        //  Error
        error: {
          DEFAULT: "#EF4444", // Rose Red
          light: "#F87171",
          dark: "#B91C1C",
        },

        // Secondary
        secondary: {
          DEFAULT: "#374151", // Slate Gray
          light: "#6B7280",
          dark: "#1F2937",
        },

        //  Neutral
        neutral: {
          light: "#F9FAFB",   // Light background
          DEFAULT: "#FFFFFF", // White
          dark: "#E5E7EB",    // Subtle gray
        },

        //  Accent (sparingly)
        accent: {
          purple: "#8B5CF6",
          teal: "#14B8A6",
        },
      },
    },
  },
  plugins: [],
};
