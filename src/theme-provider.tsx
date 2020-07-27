import React, { FC, useEffect, useMemo} from 'react';
import { ThemeProviderProps, useCreateTheme, useTheme, ThemeContext } from "./types";

export type ThemeProviderType<T> = FC<ThemeProviderProps<T>>;

export const ThemeProvider: FC<ThemeProviderProps<any>> = ({ themes, initialTheme, children }: any) => {

    const themeKey = useMemo(() => {
        if (Object.keys(themes).length === 0) {
            throw Error('Themes must not be empty');
        }

        if (initialTheme && !themes[initialTheme]) {
            throw Error(`Theme "${initialTheme}" does not exist`);
        }

        return initialTheme || Object.keys(themes)[0];
    }, [themes, initialTheme]);


    const theme = useCreateTheme(themeKey, themes);
    const { setTheme } = useTheme();

    useEffect(() => {
        if (initialTheme) { setTheme(initialTheme); }
    }, [initialTheme]);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}