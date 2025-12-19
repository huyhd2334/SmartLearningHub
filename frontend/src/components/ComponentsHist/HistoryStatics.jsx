import React, { useState } from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { Button } from "../ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";
import { ArcElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const HistoryStatics = ({user, streak, langue}) => {
  const [showPart5Chart, setShowPart5Chart] = useState(false);
  const [showFlashChart, setShowFlashChart] = useState(false);
  const [showWordsChart, setShowWordsChart] = useState(false);
  
  const [dataFlashCard, setDataFlashCard] = useState([])
  const [dataTotalVocab, setDataTotalVocab] = useState([])

  const getData = async({type}) => {
      const accessToken = localStorage.getItem("accessToken");
      const labelFlashCard = ["level0","level1", "level2", "level3", "level4", "level5", "level6"];
      if(type === "flashcard"){
      const res = await api.post("/hist/countflashcard", {user: user, langue: langue})
      let dataFlashCardRecv = {
        labels: labelFlashCard,
        datasets: [
          {
            label: "Flash",
            data: res.data.dataFlashCard,
            backgroundColor: "rgba(54, 162, 235, 0.6)",},],
          };
      setDataFlashCard(dataFlashCardRecv)
      return 
    }if(type === "totalvocab"){
      const res = await api.post("/hist/countallvocab", {user: user, langue: langue})
      if(langue === "english"){
              let dataTotalVocabRecv = {
          datasets: [{data: [res.data.totalVocab, 615],
                      backgroundColor: ["#36A2EB","#FFCE56"],
          borderWidth: 1}],
          labels: ['YourWords','TotalWords'],
      }
      setDataTotalVocab(dataTotalVocabRecv)
      }else{
              let dataTotalVocabRecv = {
          datasets: [{data: [res.data.totalVocab, 103794],
                      backgroundColor: ["#36A2EB","#FFCE56"],
          borderWidth: 1}],
          labels: ['YourWords','TotalWords'],
      }
      setDataTotalVocab(dataTotalVocabRecv)
      }
  }
}
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ flashcard",
      },
    },
  };
  return (
    <div className="flex flex-col space-y-2 pl-15">
      <h1 className="text-2xl font-semibold flex flex-row justify-center items-center w-30 h-10 border-2 bg-blue-400 rounded-4xl p-5 text-white"> Data </h1>
      <Button className="w-40 h-7" onClick={async() => { await getData({ type: "flashcard" }); setShowFlashChart(true)}}> ShowFlashChart </Button>
      {showFlashChart && (
        <div className="pl-50" style={{ width: "900px" }}>
          <Bar data={dataFlashCard} options={options} />
        </div>
      )}
      <Button className="w-40 h-7" onClick={async() => { await getData({ type: "totalvocab" }); setShowWordsChart(true)}}> ShowTotalChart </Button>
      {showWordsChart && (
        <div className="pl-50" style={{ width: "600px" }}>
          <Doughnut data={dataTotalVocab}/>
        </div>
      )}
    </div>
  );
};
export default HistoryStatics;
