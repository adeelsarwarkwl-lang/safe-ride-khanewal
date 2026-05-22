
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function App() {
  const phone='923216899333';
  const [pickupText,setPickupText]=useState('');
  const [destText,setDestText]=useState('');
  const [pickup,setPickup]=useState(null);
  const [dest,setDest]=useState(null);
  const [route,setRoute]=useState([]);
  const [fare,setFare]=useState(null);
  const [eta,setEta]=useState(null);
  const [distance,setDistance]=useState(null);

  async function searchPlace(query, setter){
    if(!query) return;
    const q = encodeURIComponent(query + ', Punjab, Pakistan');
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}`);
    const data = await res.json();
    if(data[0]) setter({lat:parseFloat(data[0].lat), lng:parseFloat(data[0].lon)});
  }

  async function calcRoute(){
    if(!pickup || !dest) return;
    const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`);
    const data = await res.json();
    if(data.routes?.[0]){
      const r=data.routes[0];
      setRoute(r.geometry.coordinates.map(c=>[c[1],c[0]]));
      const km = r.distance/1000;
      const mins = Math.round(r.duration/60);
      setDistance(km.toFixed(1));
      setEta(mins);
      const est = Math.round(250 + km*40);
      setFare(est);
    }
  }

  function useCurrent(){
    navigator.geolocation?.getCurrentPosition(p=>{
      setPickup({lat:p.coords.latitude,lng:p.coords.longitude});
      setPickupText('Current Location');
    });
  }

  function book(){
    const msg = `Safe Ride Khanewal Quote Request
Pickup: ${pickupText}
Destination: ${destText}
Distance: ${distance||'-'} km
ETA: ${eta||'-'} mins
Estimated Fare: Rs ${fare||'-'}
Pickup GPS: https://maps.google.com/?q=${pickup?.lat},${pickup?.lng}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,'_blank');
  }

  const input={width:'100%',padding:'12px',marginBottom:'10px',border:'1px solid #ccc',borderRadius:'10px'};
  return <div style={{padding:10,background:'#f3f3f3',minHeight:'100vh',fontFamily:'Arial'}}>
    <div style={{maxWidth:480,margin:'0 auto',background:'#fff',padding:16,borderRadius:16}}>
      <h2>🛡️ Safe Ride Khanewal</h2>
      <button onClick={useCurrent} style={input}>Use My Current Location</button>
      <input style={input} value={pickupText} onChange={e=>setPickupText(e.target.value)} placeholder="Pickup (e.g. Rehman Colony Khanewal)" />
      <button onClick={()=>searchPlace(pickupText,setPickup)} style={input}>Search Pickup</button>
      <input style={input} value={destText} onChange={e=>setDestText(e.target.value)} placeholder="Destination in Punjab (e.g. DHA Lahore)" />
      <button onClick={()=>searchPlace(destText,setDest)} style={input}>Search Destination</button>
      <button onClick={calcRoute} style={{...input, background:'#111', color:'#fff'}}>Calculate Fare</button>

      <MapContainer center={[30.1575,71.5249]} zoom={7} style={{height:300,width:'100%'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {pickup && <Marker position={[pickup.lat,pickup.lng]} />}
        {dest && <Marker position={[dest.lat,dest.lng]} />}
        {route.length>0 && <Polyline positions={route} />}
      </MapContainer>

      {fare && <div style={{padding:12}}>
        <p><b>Distance:</b> {distance} km</p>
        <p><b>ETA:</b> {eta} mins</p>
        <p><b>Estimated Fare:</b> Rs {fare}</p>
        <button onClick={book} style={{...input, background:'green', color:'#fff'}}>Request Quote on WhatsApp</button>
      </div>}
    </div>
  </div>
}
