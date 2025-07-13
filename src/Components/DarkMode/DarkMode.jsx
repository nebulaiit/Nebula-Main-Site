import React from 'react';
import './DarkMode.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../redux/darkModeSlice';


export default function DarkMode() {
    const darkMode = useSelector((state) => state.darkMode.enabled);
    const dispatch = useDispatch();

    return (
        <div
            className="theme-toggle-container"
            onClick={() => dispatch(toggleDarkMode())}
            role="button"
            aria-label="Toggle Dark Mode"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter') dispatch(toggleDarkMode());
            }}
        >
            <div className={`theme-toggle ${darkMode ? 'dark' : ''}`}>
                <div className="toggle-label">{darkMode ? '🌙 ' : '☀️'}</div>
            </div>
        </div>
    );
}
