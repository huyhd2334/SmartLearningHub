import api from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const HomePageNews = ({ user }) => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const getReading = async () => {
            try {
                const res = await api.post("/getreading", { get: "get" })
                if (res.data) {
                    setArticles(res.data.reading)
                }
            } catch (error) {
                console.error(error)
                toast.error("Failed to get articles")
            }
        }
        getReading()
    }, [user])

    return (
        <div className='border-2 border-black rounded-4xl p-5 w-[1100px] overflow-auto'>
            <span className='absolute -top-4 left-10 text-lg bg-green-300 px-2 rounded-4xl'> Daily Reading</span>
            {articles.length === 0 && <p>Loading articles...</p>}
            {articles.map((a, index) => (
                <div key={index} className="mb-4">
                    <h2 className="font-bold">--- {a.title} ---</h2>
                    <p><b>Source:</b> {typeof a.source === "object" ? a.source.name : a.source || "Unknown source"}</p>
                    <p><b>Description:</b> {typeof a.description === "string" ? a.description : JSON.stringify(a.description) || "No description"}</p>
                    <p><b>Content:</b> {typeof a.content === "string" ? a.content : JSON.stringify(a.content) || "No content"}</p>
                </div>
            ))}
        </div>
    )
}

export default HomePageNews
