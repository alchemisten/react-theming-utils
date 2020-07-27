import React, { useContext, useMemo, useState } from 'react';

// types
export type ThemeMap<T> = { [id: string]: T }

export interface ThemeContextType<T> {
    themes: ThemeMap<T>,
    currentTheme: string;
    setTheme: (key: string) => void
}

export interface ThemeProviderProps<T> {
    themes: ThemeMap<T>;
    initialTheme?: string;
}

// context
export const ThemeContext = React.createContext<ThemeContextType<any>>({
    themes: {},
    currentTheme: '',
    setTheme: () => { }
    // TODO add methods for adding and removing themes at runtime, luxusprobleme
});

// theme state hook
export const useCreateTheme = <T>(initialTheme: string, themes: ThemeMap<T>) => {
    const [currentTheme, setTheme] = useState(initialTheme);
    return {
        currentTheme, setTheme, themes
    }
}

// theme interpolate style hook
export const useStyleWithTheme = <P extends Record<keyof P, P[keyof P]>, T>(styleContainer: (theme: T) => P): Record<keyof P, P[keyof P]> => {
    const theme = useContext(ThemeContext);

    const memorizedTheme = useMemo(() => {
        return styleContainer(theme.themes[theme.currentTheme]); // TODO theme.theme is ugly
    }, [theme.currentTheme]);

    return memorizedTheme;
}

// theme use context hook
export const useTheme = <T>(): ThemeContextType<T> => {
    return useContext(ThemeContext);
}