import { useEffect, useRef, useState } from 'react';
import './rename-container.styles.css';
import PropTypes from 'prop-types';
const RenameContainer=({isEditIconClicked,handleRenameIconClick,clickedItemName,handleRename,handleSetClickedItemIdToNull})=>{
    const inputRef = useRef(null);
    const [inputValue,setInputValue] = useState('');
    const [isNameChanged,setIsNameChanged]=useState(false);
    const renameButtonRef = useRef(null);

    useEffect(()=>{        
        setInputValue(clickedItemName ?? 'new name');
    },[clickedItemName])
    
    useEffect(()=>{
        if(isEditIconClicked){
            inputRef.current.focus();
        }
    },[isEditIconClicked]);

    useEffect(()=>{
        setIsNameChanged(inputValue?.trim() !== clickedItemName?.trim())
    },[inputValue,clickedItemName])
    
    function inputChangeHandler(val){
        setInputValue(val);
    }
    function handleOkClick(){
        if(!renameButtonRef.current?.disabled){
            handleRename(inputValue);
            inputRef.current.blur();
        }
    }
    
    function renameEnterHandler(key){
        if(key === 'Enter'){
            handleOkClick();
        }
    }
    // console.log('render rename container');
    return(
        <div className='overlaying' onClick={()=>handleRenameIconClick(false)}>
        <div className='rename-container' onClick={(e)=>e.stopPropagation()}>
        <p>Rename the list item ?</p>
            <div className="rename-input-div">
            <input type="text" maxLength={35} value={inputValue} ref={inputRef} onChange={(e)=>inputChangeHandler(e.target.value)} onKeyUp={(e)=>renameEnterHandler(e.key)} />
            <div className="input-len-indicator">
            {inputValue ? inputValue.length : ''}/35
            </div>
            </div>
            <div className='rename-container-btn-wrapper'>
                <button onClick={()=>{
                    handleRenameIconClick(false)
                    handleSetClickedItemIdToNull(null);
                }}>Cancel</button>
                <button onClick={handleOkClick} ref={renameButtonRef} disabled={!isNameChanged || inputValue===''}>Rename</button>
            </div>
        </div>
        </div>
    )
}
RenameContainer.propTypes={
    isEditIconClicked:PropTypes.bool,
    handleRenameIconClick:PropTypes.func,
    clickedItemName:PropTypes.string,
    handleRename:PropTypes.func,
    handleSetClickedItemIdToNull:PropTypes.func,
}
export default RenameContainer;
