import api from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

const HomePageNews = ({ user }) => {
    const [articles, setArticles] = useState([])
    const [binary, setBinary] = useState([])
    const [learning, setLearning] = useState([])
    const [mode, setMode] = useState(true)
    useEffect(() => {
        const getReading = async () => {
            try {
                const res = await api.post("/getreading", { get: "get" })
                if(res.data){
                    setArticles(res.data.reading)
                }
                if(!mode){
                    const getbinary = await api.post("/splitreading",{id: res.data.reading[0]._id})
                    setBinary(getbinary.data.data)
                    setLearning(res.data.reading)
                }
            } catch (error) {
                console.error(error)
                toast.error("Failed to get articles")
            }
        }
        getReading()
    }, [user, mode ])
    
    const findWordDetail = async(word) => {
        const detail = await api.post("/finddetail",{word: word}) 
        toast.loading(detail.data.detail["meaning"])
    }
    return (
        <div className='border-2 border-black rounded-4xl p-5 w-[1100px] overflow-auto'>
            <Button className="absolute top-1 left-260 w-20 h-7 bg-blue-500 animate-pulse" onClick={()=> setMode(!mode)}> learn mode</Button>
            <span className='absolute -top-4 left-10 text-lg bg-green-300 px-2 rounded-4xl'> Daily Reading</span>
            {mode ? (
            <>
                {articles.map((a, index) => (
                <div key={index} className="mb-4">
                    <h2 className="font-bold">--- {a.title} ---</h2>
                    <p><b>Author:</b> {a.author || "Unknown Author"}</p>
                    <p><b>Content:</b> {a.content || "No content"}</p>
                </div>
                ))}
            </>
            ) : (
            <>
            {learning.map((a, index) => (
                <div key={index} className="mb-4">
                    <h2 className="font-bold">--- {a.title} ---</h2>
                    <p><b>Author:</b> {a.author || "Unknown Author"}</p>
                    <p><b>Content:</b></p>
                    <div className="flex flex-wrap gap-1 space-x-3">
                    {a.content.replace(/[^a-zA-Z']/g, ' ').split(/\s+/).map((w, i) => (
                        binary[i] === 1 && w !== "xuongdong"? (
                        <Button 
                            key={i} 
                            className="px-2 py-1 h-7 text-xs"
                            onClick={() => findWordDetail(w.replace(/^[^\w]+|[^\w]+$/g, ""))}
                        >
                            {w}
                        </Button>
                        ) : ( w === "xuongdong" ? (
                            <span key={i} className="w-500 h-10"></span>
                        ) : (<Button 
                                key={i} 
                                className="px-2 py-1 h-7 text-xs"
                                onClick={() => findWordDetail(w.replace(/^[^\w]+|[^\w]+$/g, ""))}
                            >
                                {w}
                            </Button>)
                        )
                    ))}
                    </div>
                </div>
                ))}
            </>
            )}
        </div>
    )
}

export default HomePageNews
