import React from 'react';
import {useSelector} from "react-redux";

const EmptyValueInput = (props) => {
    /** @type {boolean} true if type is input; false if type is textarea */
    const isInputOrTextArea = props.type === 'input';

    let inputRef = React.useRef(null);

    const inputBlock = isInputOrTextArea ? <input ref={inputRef} type="text" placeholder={props.placeholder} /> : <textarea ref={inputRef} placeholder={props.placeholder} />;

    return (
        <div className='emptyValueInput'>
            {inputBlock}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => props.onClickSVG(inputRef)}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M20 7V8.2C20 9.88016 20 10.7202 19.673 11.362C19.3854 11.9265 18.9265 12.3854 18.362 12.673C17.7202 13 16.8802 13 15.2 13H4M4 13L8 9M4 13L8 17"
                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        </div>
    );
}

export default EmptyValueInput;