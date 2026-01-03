import { useEffect, useState } from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import api from "@/lib/axios";
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

const HistoryStatics = ({user, langue}) => {

  const [showChart, setShowChat] = useState(true)
  const [dataFlashCard, setDataFlashCard] = useState({labels: [], datasets: []})
  const [dataTotalVocab, setDataTotalVocab] = useState({labels: [], datasets: []})

  const getData = async() => {
      const labelFlashCard = ["level0","level1", "level2", "level3", "level4", "level5", "level6"];

      const flashCard = await api.post("/hist/countflashcard", {user: user, langue: langue})
      let dataFlashCardRecv = {
        labels: labelFlashCard,
        datasets: [
          {
            label: "Flash",
            data: flashCard.data.dataFlashCard,
            backgroundColor: "rgba(54, 162, 235, 0.6)",},],
          };
      setDataFlashCard(dataFlashCardRecv)
      
      const allVocab = await api.post("/hist/countallvocab", {user: user, langue: langue})
      if(langue === "english"){
          let dataTotalVocabRecv = {
          datasets: [{data: [allVocab.data.totalVocab, 615],
                      backgroundColor: ["#36A2EB","#FFCE56"],
          borderWidth: 1}],
          labels: ['YourWords','TotalWords'],
      }
      setDataTotalVocab(dataTotalVocabRecv)
      
      }else{
          let dataTotalVocabRecv = {
          datasets: [{data: [allVocab.data.totalVocab, 103794],
                      backgroundColor: ["#36A2EB","#FFCE56"],
          borderWidth: 1}],
          labels: ['YourWords','TotalWords'],
      }
      setDataTotalVocab(dataTotalVocabRecv)
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

  useEffect(() => {
    getData()
  }, [showChart])

  return (
    <div className="flex flex-col space-y-2 pl-15">
      <h1 className="text-2xl font-semibold flex flex-row justify-center items-center w-30 h-10 border-2 bg-blue-400 rounded-4xl p-5 text-white"> Data </h1>
      <div className="flex flex-row justify-center items-center space-x-3">
      {showChart && dataFlashCard.datasets.length > 0 && (
        <div style={{ width: "1000px", height: "700px" }}>
            <Bar data={dataFlashCard} options={options} />
        </div>
      )}

      {showChart && dataTotalVocab.datasets.length > 0 && (
        <div style={{ width: "1000px", height: "700px" }}>
            <Doughnut data={dataTotalVocab} />
        </div>
      )}
      </div>
    </div>
  );
};
export default HistoryStatics;
