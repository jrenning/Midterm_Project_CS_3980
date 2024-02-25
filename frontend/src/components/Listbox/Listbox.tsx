import React from 'react'
import Item from '../Item/Item'
import "./Listbox.css"
import { useEffect, useState } from "react";

export type Item = {
    name: string
    brand: string
    amount: number
    id: number
}


function Listbox() {

const [groceries, setGroceries] = useState<Item[]>([]);
useEffect(() => {
  getGroceries();
}, []);

async function getGroceries() {
  let api = await fetch("http://127.0.0.1:8000/groceries");
  
  let apijson = await api.json();
  console.log(apijson)
  setGroceries(apijson);
}




  return (
    <div className="listbox">
        {groceries.map((item)=> (
            <Item {...item} key={item.name}/>
        ))}
    </div>
  )
}

export default Listbox