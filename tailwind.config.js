module.exports = {
  purge: ['./src/views/**/*.vue', './src/components/**/*.vue', './src/store/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primaryColor: '#006963',
        secondaryColor: '#20ba77',
      },
      textColor: {
        primaryColor: '#006963',
        secondaryColor: '#20ba77',
      },
      width: {
        '17': '4.5rem',
        '38': '9.5rem',
      },
      minWidth: {
        '1/2': '50%',
        '1/4': '25%',
      },
      maxWidth: {
        '1/2': '50%',
      },
      margin: {
        '19': '4.4rem',
      },
      inset: {
        '50%': '50%',
      },
      minHeight: {
        withoutNav: 'calc(100vh - 8rem)',
      },
      maxHeight: {
        withoutNav: 'calc(100vh - 8rem)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
