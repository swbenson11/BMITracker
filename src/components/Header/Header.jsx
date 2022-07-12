import React from 'react';
import style from './Header.module.css';

// https://reactjs.org/docs/composition-vs-inheritance.html
const Header = (props) => {
	// https://dev.to/myogeshchavan97/an-introduction-to-css-modules-in-react-2fkd
	return <h1 className={style.header}> {props.children}</h1>;
};

export default Header;
