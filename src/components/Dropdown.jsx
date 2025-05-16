import React, { useState } from 'react';

import './Dropdown.css';

/**
 * A dropdown menu.
 * @param {Object} props 
 * @param {Array} props.choices - Choices of the dropdown.
 * @param {Array<Function>} props.onClicks - The functions fired when the choices are selected.
 * @returns {React.JSX.Element} - The dropdown menu.
 */
export default function Dropdown({ choices, onClicks, children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  // alert(children.constructor.name);

  function toggleIsOpen() {
    const afterToggle = isOpen ? false : true;
    setIsOpen(afterToggle);
  }

  const choiceList = choices.map((choice, index) => {
    return (
      <a key={choice} onClick={onClicks[index]}>{choice}</a>
    );
  });

  return (
    <div className='dropdown'>
      <button onClick={toggleIsOpen} className={`dropbtn ${className}`}>
        {children}
      </button>
        <div id="myDropdown" className={`dropdown-content ${isOpen ? 'show' : ''}`}>
          {choiceList}
        </div>
    </div>
  );
}
