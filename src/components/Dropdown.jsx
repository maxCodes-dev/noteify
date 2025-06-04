import { useState, useEffect, useRef } from "react";

import "./Dropdown.css";

/**
 * A dropdown menu.
 * @param {Object} props
 * @param {Array} props.choices - Choices of the dropdown.
 * @param {Array<Function>} props.onClicks - The functions fired when the choices are selected.
 * @returns {React.JSX.Element} - The dropdown menu.
 */
export default function Dropdown({ choices, onClicks, children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  /** @type {?React.RefObject<HTMLButtonElement>} */
  const dropbtnRef = useRef(null);

  function toggleIsOpen() {
    const afterToggle = isOpen ? false : true;
    setIsOpen(afterToggle);
  }

  // alert(dropbtnRef.current);

  useEffect(() => {
    /**
     *
     * @param {PointerEvent} event
     */
    window.onclick = (event) => {
      if (!dropbtnRef.current.contains(event.target)) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }, [isOpen]);

  const choiceList = choices.map((choice, index) => {
    return (
      <a key={choice} onClick={onClicks[index]}>
        {choice}
      </a>
    );
  });

  return (
    <div className="dropdown">
      <button
        ref={dropbtnRef}
        onClick={toggleIsOpen}
        className={`dropbtn ${className}`}
      >
        {children}
      </button>
      <div
        id="myDropdown"
        className={`dropdown-content ${isOpen ? "show" : ""}`}
      >
        {choiceList}
      </div>
    </div>
  );
}
