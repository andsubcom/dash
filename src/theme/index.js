import { extendTheme, theme } from "@chakra-ui/react"

export default extendTheme({
  ...theme,
  fonts: {
    heading: "Averta",
    body: "Averta",
  },
  colors: {
    ...theme.colors,
    main: 
    {
      50: '#e4ebff',
      100: '#b2c1ff',
      200: '#7f93ff',
      300: '#4d63fe',
      400: '#1e45fd',
      500: '#063be3',
      600: '#0139b2',
      700: '#003280',
      800: '#00244f',
      900: '#000f1f',
    },
    secondary: {
      background: "#FBF7EF",
      link: "#4A5568",
      card: "#ffffff",
      inputHelper: "#CBD5E0"
    },
    navItem: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568"
    }
  }
})
