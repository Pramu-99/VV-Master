export default function CameraItem({image, no, frame,size,brand}){
return(
<div className="container">
    <div style={{backgroundImage:`url(${image})`, borderRadius:'5px 5px 0 0', backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",width:"100%",height:"200px"
   }}  ></div>
    <div style={{margin:' 10px',fontWeight:'bold'}}> {no}. {frame}. {size}<br/> {brand}</div>
   <div style={{  border:'1px solid  #D2D0D0', borderRadius: "5px",margin:'0 10px',padding:'5px'}}><input type="checkbox"/>&larr;Click here</div>
</div>
);
}