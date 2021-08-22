export const lightAppTheme = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    palette: {
        type: 'light',
        primary: {
            // blue
            main: '#3670c7'
        },
        secondary: {
            // light blue
            main: '#a5c9e8'
        },
        third: {
            // white
            main: '#fafafa'
        },
        fourth: {
            // blackish blue
            main: '#31343c'
        }
    },
    spacing: 8,
    typography: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    }
};

export const darkAppTheme = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    palette: {
        type: 'dark',
        grey: {
            800: '#000000', // overrides failed
            900: '#212121' // overrides success
        },
        primary: {
            // blue
            main: '#3670c7'
        },
        secondary: {
            // light blue
            main: '#a5c9e8'
        },
        third: {
            // white
            main: '#fafafa'
        },
        fourth: {
            // blackish blue
            main: '#31343c'
        }
    },
    spacing: 8,
    typography: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500
    }
};
