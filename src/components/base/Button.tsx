import { ReactNode } from 'react';
import classes from './Button.module.css';

type ButtomProps = {
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
    className?: string;
    children?: ReactNode
}

function Button({variant, onClick, children, className}: ButtomProps) {
    const buttonClasses = classes.button + ` ${variant === 'primary' && classes['button-primary']}` + ' ' + className;
  return <button className={buttonClasses} onClick={onClick}>{children}</button>;
}

Button.defaultProps = {
    children: 'Default Button Text',
    variant: 'secondary'
}

export default Button;