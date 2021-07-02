import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Fujifilm x-T4 ', desc: "Fujifilm X-T4 26 MP Mirrorless Camera Body (APS-C X-Trans CMOS 4 Sensor, EVF, Face/Eye AF, 5-Axis IBIS, 3 Vari-Angle Touchscreen, 4K/60P & FHD/240P Video,Film Simulation, Weather Resistance) ", price:167000,img:Item1},
        {id:2,title:'Canon EOS 200D', desc: " Canon EOS 200D II 24.1MP Digital SLR Camera + EF-S 18-55mm is STM Lens + EF-S 55-250mm ", price:62200,img: Item2},
        {id:3,title:'Canon EOS 1500D', desc:" Canon EOS 1500D 24.1 Digital SLR Camera (Black) with EF S18-55 is II Lens Sensor",price:43000,img: Item3},
        {id:4,title:'          POLO D3000 ', desc: " DSANTECH POLO D3000 STDSLRX1 Digital Camera with 16.0MP 16X Digital Zoom MP3 MP4 HDMI, 16x optical zoom with 3 lens", price:52000,img:Item4},
        {id:5,title:'Nikon D3500 ', desc: " Nikon D3500 ',24.2MP DX-Format CMOS Sensor | 3.0, 921k-Dot LCD Monitor | Multi-CAM 1000 11-Point AF System | SnapBridge Bluetooth Connectivity ", price:38000,img: Item5},
        {id:6,title:'Nikon D850', desc:" Nikon D850 45.7MP Digital SLR Camera (Black) with AF-S Nikkor 24-120mm F/4G ED VR Lens ",price:34000,img: Item6}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer