export default function CameraItem({image, des, camname,item,brand,itemid,onCheckboxChange}){
const checkValidity=(event)=>{
    if(event.target.checked==true){
        onCheckboxChange(event);
    }
}
