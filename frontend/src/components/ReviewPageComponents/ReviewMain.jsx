import { useState, useEffect } from "react";
import styles from "./review.module.css";
import { Button } from "../ui/button";
import api from "@/lib/axios";

const ReviewMain = () => {
  const [animate, setAnimate] = useState("slideIn");
  const [index, setIndex] = useState(0)
  const [listVocab, setListVocab] = useState([])

  const langue = JSON.parse(localStorage.getItem("langue"))?.langue
  const user = JSON.parse(localStorage.getItem("user"))?.accountName
  
  useEffect(()=> {
    const getTopRisk = async() => {
      const res = await api.post("/review", {accountName: user, langue: langue})
      if(res.data.success){
        console.log("get top risk vocab", res.data.vocabs.length)
        setListVocab(res.data.vocabs)
      }else{console.log("error when get risk vocab to review")}
    }
    getTopRisk()
  },[])

  const handleClick = async(up) => {
    setAnimate("slideOut");
    
    const res = await api.post("/update", {accountName: user, vocab: listVocab[index].vocab, langue: langue, iscorrect: up})
    if(res.data.success){
      setTimeout(() => {
        setAnimate("slideIn")
        setIndex(pre => pre + 1)
      }, 500);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${styles[animate]} shadow-sm`}
      >
      <a className="text-3xl">{listVocab[index]?.vocab} </a>
      <a>Pron: {listVocab[index]?.pron} - ({listVocab[index]?.type})</a>
      <a>Mean: {listVocab[index]?.meaning}</a>
      <a className="flex flex-row justify-center items-center space-x-2">
        <span>
          Risk Score: {listVocab[index]?.risk?.toFixed(2)}
        </span> 
        <div className="bg-blue-500 rounded-2xl px-1 py-1 text-white text-sm">level: {listVocab[index]?.level}</div>
      </a>

      <div className={"flex flex-row space-x-8 absolute bottom-6 "}>
          <Button className={"px-2 py-2 bg-red-600 hover:text-black"} onClick={()=>{handleClick(false)}}> Bad (incorrect) </Button>
          <Button className={"px-2 py-2 hover:text-black"} onClick={()=>{handleClick(true)}}> Good (correct)</Button>
      </div>
      </div>
    </div>
  );
};

export default ReviewMain;