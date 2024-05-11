export default function CameraItem({image, des, camname,item,brand,itemid,onCheckboxChange}){
const checkValidity=(event)=>{
    if(event.target.checked==true){
        onCheckboxChange(event);
    }
}
return(
<div className="container_re">
    <div style={{backgroundImage:`url(${image})`, borderRadius:'5px 5px 0 0', backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",width:"100%",height:"200px"
   }}  ></div>
    <div style={{margin:' 10px',fontWeight:'bold'}}> {brand} {camname} {item}<br/> {des}</div>
   <div style={{  border:'1px solid  #D2D0D0', borderRadius: "5px",margin:'0 10px',padding:'5px'}}><input type="checkbox" value={itemid}  onClick={onCheckboxChange}/>&larr;Click here</div>
</div>
);
} 
