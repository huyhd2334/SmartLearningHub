import api from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const HomePageNews = ({ user }) => {
    const [articles, setArticles] = useState([])

    // useEffect(() => {
    //     const fetch5Articles = async () => {
    //         try {
    //             const res = await api.post("/crawnews", { type: "travel" })
    //             if (res.data && Array.isArray(res.data.articles)) {
    //                 setArticles(res.data.articles)
    //                 toast.success("Done!")
    //             }
    //         } catch (error) {
    //             console.error(error)
    //             toast.error("Failed to fetch articles")
    //         }
    //     }
    //     fetch5Articles()
    // }, [user])

    return (
        <div className='border-2 border-black rounded-8xl p-5 w-[300px] h-[300px] overflow-auto'>
            {articles.length === 0 && <p>Loading articles...</p>}
            {articles.map((a, index) => (
                <div key={index} className="mb-4">
                    <h2 className="font-bold">--- {a.title} ---</h2>
                    <p><b>Source:</b> {typeof a.source === "object" ? a.source.name : a.source || "Unknown source"}</p>
                    <p><b>Description:</b> {typeof a.description === "string" ? a.description : JSON.stringify(a.description) || "No description"}</p>
                    <p><b>Content:</b> {typeof a.content === "string" ? a.content : JSON.stringify(a.content) || "No content"}</p>
                    <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Read more
                    </a>
                </div>
            ))}
        </div>
    )
}

export default HomePageNews
