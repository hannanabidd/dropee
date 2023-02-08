import * as React from 'react';
import styles from './styles.module.css';

import { IButtonProps } from './Button.d';

export const Button: React.FC<IButtonProps> = ({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);
