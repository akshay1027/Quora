import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { useAppSelector } from './redux/store';

import App from './App';
import { lightAppTheme, darkAppTheme } from './config/materialThemeConfig';

const AppProviders = () => {
    const darkTheme = useAppSelector(state => state.ui.darkTheme);
    const appliedTheme = createTheme(darkTheme ? darkAppTheme : lightAppTheme);
    return (
        <ThemeProvider theme={appliedTheme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={4}>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default AppProviders;
