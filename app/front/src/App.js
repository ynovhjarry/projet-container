import React, {useState, useEffect} from 'react';
const API = process.env.REACT_APP_API_URL || '/api';

function App(){
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  useEffect(()=>{ fetch(API+'/items').then(r=>r.json()).then(setItems).catch(()=>setItems([])) }, []);
  async function add(){
    if(!text) return;
    await fetch(API+'/items',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});
    setText('');
    const r = await fetch(API+'/items'); setItems(await r.json());
  }
  return <div style={{padding:20,fontFamily:'Arial'}}>
    <h2>Liste d'items</h2>
    <ul>{items.map(i=> <li key={i.id}>{i.text}</li>)}</ul>
    <input value={text} onChange={e=>setText(e.target.value)} placeholder="nouvel item"/>
    <button onClick={add}>Ajouter</button>
  </div>
}
export default App;
