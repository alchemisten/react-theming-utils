import { CSSProperties } from 'react';
import { useStyleWithTheme } from '../src/types';

interface Theme {
    primary: string;
}

const styles = (theme: Theme) => {
    return {
        container: {
            color: theme.primary
        } 
    }
}

const Foo = () => {
    
    const style = useStyleWithTheme(styles);

    return (
        <div>

        </div>
    );
}