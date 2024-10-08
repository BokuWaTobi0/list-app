import { auth,database } from "../../utils/firebase.js";
import { ref,remove } from "firebase/database";
import { isMobile } from "../../utils/check-mobile.js";
import PropTypes from 'prop-types';
import './delete-button.styles.css';
import { FaRegTrashCan } from "react-icons/fa6";

const DeleteButton=({itemId,setIsEditIconClicked,clickedItemId,dbReference})=>{
    const user = auth.currentUser;

    function handleRemove(itemId){
        const itemRef = ref(database,`shoppingLists/${user.uid}/${dbReference}/${itemId}`);
        remove(itemRef);
        setIsEditIconClicked(false);
    }
    
    const deleteDivStyles={
        width:clickedItemId === itemId ? '50%' : '0',
    }

    const deleteIconClass = isMobile() ? 'delete-icon mobile' : 'delete-icon';
    // console.log('render delete list button');
    return(
        <div 
            className={deleteIconClass}
            style={deleteDivStyles}
            onClick={(e)=>{
                e.stopPropagation()
                handleRemove(itemId)
             }
            }>
            <FaRegTrashCan 
                className="db-tc" >
            </FaRegTrashCan>
            </div>
    )
}
DeleteButton.propTypes={
    itemId:PropTypes.string,
    setIsEditIconClicked:PropTypes.func,
    clickedItemId:PropTypes.string,
    dbReference:PropTypes.string,
}
export default DeleteButton;