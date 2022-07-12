import React from 'react';
import style from './Header.module.css';

const Header = (props) => {
	return <h1 className={style.header}> {props.children}</h1>;
};

export default Header;
