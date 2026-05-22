
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
 iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
 iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
 shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});
function Picker({setLocation}) {
 useMapEvents({
   click(e){ setLocation(e.latlng); }
 });
 return null;
}
export default function App(){
 const phone='923216899333';
 const [loc,setLoc]=useState({lat:30.1575,lng:71.5249});
 const useMyLocation=()=>navigator.geolocation?.getCurrentPosition((p)=>setLoc({lat:p.coords.latitude,lng:p.coords.longitude}));
 const submit=(e)=>{
   e.preventDefault();
   const d=new FormData(e.target);
   const msg=`Safe Ride Booking\nName: ${d.get('name')}\nPickup: ${d.get('pickup')}\nService: ${d.get('service')}\nDestination: ${d.get('destination')}\nDate: ${d.get('date')}\nTime: ${d.get('time')}\nGPS: https://maps.google.com/?q=${loc.lat},${loc.lng}`;
   window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank');
 };
 const input={width:'100%',padding:'10px',marginBottom:'10px',borderRadius:'10px',border:'1px solid #ccc'};
 return <div style={{background:'#f2f2f2',minHeight:'100vh',padding:'10px',fontFamily:'Arial'}}>
 <div style={{maxWidth:'450px',margin:'0 auto',background:'#fff',padding:'16px',borderRadius:'18px'}}>
 <h2 style={{textAlign:'center'}}>🛡️ Safe Ride Khanewal</h2>
 <button onClick={useMyLocation} style={{width:'100%',padding:'10px',marginBottom:'10px'}}>Use My Current Location</button>
 <MapContainer center={[loc.lat,loc.lng]} zoom={13} style={{height:'250px',width:'100%',marginBottom:'10px'}}>
 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
 <Marker position={[loc.lat,loc.lng]} />
 <Picker setLocation={setLoc}/>
 </MapContainer>
 <div style={{fontSize:'12px',marginBottom:'10px'}}>Tap map to choose exact pickup location</div>
 <form onSubmit={submit}>
 <input style={input} name="name" placeholder="Your Name" required />
 <input style={input} name="pickup" placeholder="Pickup address/landmark" required />
 <select style={input} name="service"><option>Local Ride</option><option>Intercity Ride</option></select>
 <select style={input} name="destination"><option>Multan</option><option>Lahore</option><option>Faisalabad</option><option>Sahiwal</option><option>Bahawalpur</option></select>
 <input style={input} type="date" name="date" required />
 <input style={input} type="time" name="time" required />
 <button style={{width:'100%',padding:'12px',background:'#111',color:'#fff',border:'none',borderRadius:'10px'}}>Book on WhatsApp</button>
 </form></div></div>
}
