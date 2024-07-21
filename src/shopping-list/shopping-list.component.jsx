import { Fragment, useEffect, useRef, useState } from "react"
import { onValue, ref, remove } from "firebase/database";
import { auth, database } from '../utils/firebase.js';
const ShoppingList=()=>{
    const listRefs = useRef({});
    const [items,setItems]=useState([]);
    const [clickedItemId,setClickedItemId]=useState(null);
    const user = auth.currentUser;

    useEffect(()=>{
        if(user){
            const shoppingListRef = ref(database,`shoppingLists/${user.uid}`);
            onValue(shoppingListRef,(snapshot)=>{
                const data = snapshot.val();
                if(data){
                    const itemsArray = Object.entries(data).map(([id,value])=>({id,value}));
                    setItems(itemsArray);
                }else{
                    setItems([]);
                }
            });
        }
    },[user]);

    function handleListOutSideClick(event){
        const refArray = Object.values(listRefs.current);
        if(refArray.every(ref=>ref && !ref.contains(event.target))){
            setClickedItemId(null);
        }
    }

    useEffect(()=>{
        if(clickedItemId){
            document.addEventListener('click',handleListOutSideClick);
        }else{
            document.removeEventListener('click',handleListOutSideClick);
        }
        return ()=>{
            document.removeEventListener('click',handleListOutSideClick);
        }
    },[clickedItemId]);
    
    function handleRemove(itemId){
        const itemRef = ref(database,`shoppingLists/${user.uid}/${itemId}`);
        remove(itemRef);
    }

    function showDelIcon(itemId){
        setClickedItemId(clickedItemId === itemId ? null : itemId);
    }
    
    return(
        <Fragment>
        <ul id="shopping-list">
        {items.map((item)=>{
            const deleteDivStyles={
                width:clickedItemId === item.id ? '100%' : '0',
            }
         return (
            <li key={item.id} onClick={()=>showDelIcon(item.id)} ref={el => listRefs.current[item.id]=el}>{item.value}<div className="delete-icon" style={deleteDivStyles}  onClick={(e)=>{
            e.stopPropagation()
            handleRemove(item.id)
        }}><i className="fa-regular fa-trash-can"></i></div></li>
    );   
        })}
        </ul>
        </Fragment>
    )
}
export default ShoppingList;