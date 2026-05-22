
export default function App() {
  const phone = '923216899333';
  const submitBooking = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const msg = `Safe Ride Khanewal Booking Request\nName: ${data.get('name')}\nPickup: ${data.get('pickup')}\nService: ${data.get('service')}\nDestination: ${data.get('destination')}\nDate: ${data.get('date')}\nTime: ${data.get('time')}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  const style={maxWidth:'420px',margin:'20px auto',padding:'24px',background:'#fff',borderRadius:'20px',boxShadow:'0 4px 20px rgba(0,0,0,.1)',fontFamily:'Arial'};
  const input={width:'100%',padding:'12px',marginBottom:'12px',borderRadius:'12px',border:'1px solid #ccc'};
  const btn={width:'100%',padding:'14px',borderRadius:'12px',border:'none',background:'#111',color:'#fff'};
  return <div style={{background:'#f2f2f2',minHeight:'100vh',padding:'20px'}}>
    <div style={style}>
      <div style={{textAlign:'center'}}><div style={{fontSize:'48px'}}>🛡️🚗</div><h1>Safe Ride Khanewal</h1><p>محفوظ سفر، قابل اعتماد سروس</p></div>
      <form onSubmit={submitBooking}>
        <input style={input} name="name" placeholder="Your Name / آپ کا نام" required />
        <input style={input} name="pickup" placeholder="Pickup Location / پک اپ مقام" required />
        <select style={input} name="service" required><option>Local Ride</option><option>Intercity Ride</option></select>
        <select style={input} name="destination"><option>Multan</option><option>Lahore</option><option>Faisalabad</option><option>Sahiwal</option><option>Bahawalpur</option></select>
        <input style={input} type="date" name="date" required />
        <input style={input} type="time" name="time" required />
        <button style={btn}>Get Quote on WhatsApp</button>
      </form>
    </div>
  </div>
}
