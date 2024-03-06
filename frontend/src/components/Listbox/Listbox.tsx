import React from 'react'
import Item from '../Item/Item'
import "./Listbox.css"
import { useEffect, useState } from "react";

export enum Type {
  TV = "TV",
  Movie = "Movie",
  Book = "Book",
  Video_Game = "Video Game",
  Other = "Other",
}


type Recommendation = {
  name: string;
  id: number;
  type: Type;
  link: string;
  description?: string;
};


function Listbox() {

const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
useEffect(() => {
  getRecommendations();
}, []);

async function getRecommendations() {
  let api = await fetch("http://127.0.0.1:8000/recs");
  console.log(api)
  let apijson = await api.json();
  console.log(apijson)
  setRecommendations(apijson);
}




  return (
    <div className="listbox">
        {recommendations.map((item)=> (
            <Item {...item} key={item.name}/>
        ))}
    </div>
  )
}

export default Listbox