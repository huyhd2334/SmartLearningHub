import api from '@/lib/axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

const HomePageNews = ({ user, langue }) => {
    const [articles, setArticles] = useState([])
    const [binary, setBinary] = useState([])
    const [learning, setLearning] = useState([])
    const [mode, setMode] = useState(true)
    const [load, setload] = useState(false)
    const [word, setWord] = useState("Undefine")
    const [wordDetail, setWordDetail] = useState(null)

    useEffect(() => {
    const getReading = async () => {
        try {
        const res = await api.post("/getreading", { get: "get", langue: langue });
        setArticles(res.data.reading);
        } catch (error) {
        toast.error("Failed to get articles");
        }
    };
    getReading();
    }, [langue]);

    useEffect(() => {
    if (!mode && articles.length > 0) {
        const getBinary = async () => {
        console.log("split reading", articles[0]._id, langue)
        const res = await api.post("/splitreading", { id: articles[0]._id, langue: langue })
        setBinary(res.data.data);
        setLearning(articles);
        };
        getBinary();
    }
    }, [mode, articles]);

    const findWordDetail = async (word) => {
        try {
            setWordDetail("");
            setload(true);
            setWord(word);

            const detail = await api.post("/finddetail", { word: word });

            console.log("word detail", detail.data.detail[0])
            
            setWordDetail(detail.data.detail[0]);

        } catch (err) {
            console.error(err);
        }
    };

    
    const handleAddVocab = async(vocab,pron, type, meaning, example) =>{
       try{
          await api.post("/adduservocab",{accountName: user, vocab,pron, type, meaning, example, langue: langue})
          toast.success(`Saving ${vocab}`)
       }catch(error){
        console.error(error)
       }
    } 

    return (
        <div className='border-2 border-black rounded-4xl p-5 w-[1100px] overflow-auto flex justify-center items-center'>
            {/* loading and vocab interact */}
            {load && (
            <div className="lg:w-sm sm:w-sm h-90 bg-white shadow-xl fixed bottom-2 right-2 rounded-2xl p-3 overflow-auto">
                <div className="grid grid-row-6 relative pl-10">
                
                <Button onClick={() => setload(false)} className="absolute -top-6 -left-6 w-15 h-15 rounded-4xl bg-black">
                    X
                </Button>

                <b className="grid row-start-1  text-center  w-[272px] text-2xl">
                    {word.toUpperCase()} "Meaning"
                </b>

                <Button
                onClick={() =>
                    handleAddVocab(
                    word.toLowerCase(),
                    wordDetail?.pronunciations?.[0]?.ipa ?? null,
                    wordDetail?.meanings?.[0]?.pos ?? "",
                    wordDetail?.meanings?.[0]?.definition ?? "",
                    wordDetail?.meanings?.[0]?.example ?? ""
                    )
                }
                disabled={!wordDetail}
                className="absolute top-0 -right-2 w-15 h-10  bg-black"
                >
                Add +
                </Button>
                <div className="row-start-2 text-2xl relative min-h-[120px]">

                    {/* LOADING */}
                    {!wordDetail && (
                    <div className="flex justify-center items-center animate-spin absolute inset-0">
                        <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12"
                        >
                        <rect fill="#e08344" height="4" rx="2" width="16" x="4" y="1" />
                        <rect fill="#c47037" height="4" rx="2" width="16" x="4" y="19" />
                        <path fill="#5dc6d1" d="M6,5H18V6a6,6,0,0,1-6,6h0A6,6,0,0,1,6,6Z" />
                        <path fill="#2eb1b7" d="M18,18v1H6V18a6,6,0,0,1,12,0Z" />
                        <path
                            fill="#6c2e7c"
                            d="M5,18v.184A2.993,2.993,0,0,0,6,24H18a2.993,2.993,0,0,0,1-5.816V18a7,7,0,0,0-14,0Z"
                        />
                        </svg>
                    </div>
                    )}

                    {/* DATA */}
                    {wordDetail?.pronunciations?.map((pr, i) => (
                     <div key={i} className="text-sm flex flex-row">
                        <a>Pronunce {pr.ipa}</a>: {pr.region}
                     </div>
                    ))}
                    {wordDetail?.meanings?.map((m, i) => (
                     <div key={i} className="text-lg">
                        <b>{m.pos}</b>: {m.definition}
                        {m.example && (
                        <div className="italic text-sm text-gray-600">
                            "{m.example}"
                        </div>
                        )}
                     </div>
                     ))
                    }
                  </div>
                </div>
            </div>
            )}

            {/* main content */}
            <Button className="absolute top-1 left-260 w-20 h-7 bg-blue-500 animate-pulse" onClick={()=> setMode(!mode)}> learn mode </Button>
            <span className='absolute -top-4 left-10 text-lg bg-green-300 px-2 rounded-4xl'> Daily Reading </span>
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
                langue === "english" ? (
                <>
                {learning.map((a, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="font-bold">--- {a.title} ---</h2>
                        <p><b>Author:</b> {a.author || "Unknown Author"}</p>
                        <p><b>Content:</b></p>
                        <div className="flex flex-wrap gap-1 space-x-3">
                        {a.content.replace(/[^a-zA-Z']/g, ' ').split(/\s+/).map((w, i) => (
                            w !== "hassh"? (
                            <Button 
                                key={i} 
                                className="px-2 py-1 h-7 text-xs"
                                onClick={() => findWordDetail(w.replace(/^[^\w]+|[^\w]+$/g, ""))}
                            >
                                {w}
                            </Button>
                            ) : (<span key={i} className="w-500 h-10"></span>
                            )
                        ))}
                        </div>
                    </div>
                    ))}
                </>
                ):(
                <>
                {learning.map((a, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="font-bold">--- {a.title} ---</h2>
                        <p><b>Author:</b> {a.author || "Unknown Author"}</p>
                        <p><b>Content:</b></p>
                        <div className="flex flex-wrap gap-1 space-x-3">
                        {binary.map((w, i) => (
                            w !== "hassh"? (
                            <Button key={i} className="px-2 py-1 h-7 text-xs gb-red-500" onClick={() => findWordDetail(w)}>
                                {w}
                            </Button>
                            ) : ( w === "hassh" ? (
                                <span key={i} className="w-500 h-10"></span>
                            ) : (<Button key={i} className="px-2 py-1 h-7 text-xs gb-red-500" onClick={() => findWordDetail(w)}>{w}</Button>)
                            )
                        ))}
                        </div>
                    </div>
                    ))}
                </>    
                )
            )}
        </div>
    )
}

export default HomePageNews
