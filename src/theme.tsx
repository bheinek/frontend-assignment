import {createSystem, defaultConfig, defineGlobalStyles} from '@chakra-ui/react';

const globalCss = defineGlobalStyles({
  'html, body, #root': {
    height: '100%',
  },
  body: {
    lineHeight: '1',
    margin: '0',
    padding: '0',
    fontFamily: 'Open-Sans, Helvetica, Sans-Serif',
    fontSize: '16px',
    backgroundColor: '#F1F2F6',
    color: '#091E42',
  },
  a: {
    textDecoration: 'none',
  },
  'ol, ul': {
    listStyle: 'none',
  },
  'blockquote, q': {
    quotes: 'none',
  },
  'blockquote:before, blockquote:after, q:before, q:after': {
    content: "''",
  },
  table: {
    borderCollapse: 'collapse',
    borderSpacing: '0',
  },
});

const customConfig = createSystem(defaultConfig, {
  globalCss,
  theme: {
    tokens: {
      fonts: {
        heading: {value: 'system-ui, sans-serif'},
        body: {value: 'system-ui, sans-serif'},
      },
      fontSizes: {
        'heading-1': {value: '28px'},
        'heading-2': {value: '24px'},
        'heading-3': {value: '20px'},
        'text-base': {value: '16px'},
        'text-small': {value: '14px'},
      },
      fontWeights: {
        'heading-1': {value: 700},
        'heading-2': {value: 600},
        'heading-3': {value: 500},
        'text-base': {value: 400},
        'text-alternative': {value: 500},
      },
      colors: {
        'text-primary': {value: '#001141'},
        'text-secondary': {value: '#4D5667'},
        'text-tertiary': {value: '#7A869A'},
        'text-white': {value: '#FFFFFF'},
        'text-danger': {value: '#B71C1C'},

        'fill-brand': {value: '#0F62FE'},
        'fill-brand-hover': {value: '#0043CE'},
        'fill-darkBlue': {value: '#001141'},
        'fill-gray': {value: '#F1F2F6'},
        'fill-gray-hover': {value: '#E6E8EF'},
        'fill-gray-lightest': {value: '#F1F2F6'},
        'fill-white': {value: '#FFFFFF'},

        'border-brand': {value: '#0F62FE'},
        'border-gray': {value: '#CAD1DE'},
        'border-danger': {value: '#E32C1E'},

        'shadow-card': {value: '#00114114'},
      },
      shadows: {
        card: {value: '0px 4px 12px {colors.shadow-card}'},
      },
    },
    recipes: {
      button: {
        base: {
          borderRadius: '100px',
        },
      },
    },
  },
});

export default customConfig;
