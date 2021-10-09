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
    font: {
      primary: '#15192C',
      secondary: '#92959E',
      disabled: '#a8aab2',
    },
    primary: '#1e45fd',
    background: '#f8f9fc',
    backgroundLight: '#fff',
    navItem: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568"
    }
  }
})
