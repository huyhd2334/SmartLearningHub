import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function ProgressMain({user, langue}) {
  
  const [vocabs, setVocabs] = useState([])
  const [vocabNumber, setVocabNumber] = useState(0)
  const [stats, setStats] = useState([])

  useEffect(() => {
    const getData =  async() => {
        try {
          toast.success(user)
          const dataPrevious = await api.post("/getuservocab", {accountName: user, langue: langue})
          if(dataPrevious.data.vocabs){
              const dataCurrent = await api.post("/getcurrentdata", {accountName: user, langue: langue})
              toast.success(`Got ${user} data.`)

              let createDay = new Date(dataCurrent.data.createAccountDate)
              let vocabsToday = dataCurrent.data.vocabs
              toast.info(createDay.toDateString())
              let now = new Date()
              
              const vocabList = dataPrevious.data.vocabs
              setVocabs(vocabList)
              setVocabNumber(vocabList.length)
              setStats([
                    {
                      metric: "Total Days",
                      current: now.toString(),
                      previous: createDay.toString(),
                      difference: "",
                      trend: "up",
                    },
                    {
                      metric: "Total Words",
                      current: vocabNumber,
                      previous: vocabsToday.length,
                      difference: "",
                      trend: "up",
                    },
                    {
                      metric: "Streak",
                      current: "",
                      previous: "",
                      difference: "",
                      trend: "",
                  },
              ]
            )
          }
        } catch (error) {
          console.log("progress main error", error)  
      }
    }
    getData()
  },[user])
  
  return (
    <div className="flex items-center justify-center p-10">
      <div className="grid grid-cols-1 divide-y bg-border divide-border overflow-hidden rounded-lg md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((item) => (
          <Card
            key={item.metric}
            className="rounded-none border-0 shadow-sm py-0"
          >
            <CardContent className="p-4 sm:p-6">
              <CardTitle className="text-base font-normal">
                {item.metric}
              </CardTitle>
              <div className="mt-1 flex items-baseline gap-2 md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-primary">
                  {item.current}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    from {item.previous}
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    "inline-flex items-center px-1.5 ps-2.5 py-0.5 text-xs font-medium md:mt-2 lg:mt-0",
                    item.trend === "up"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  )}
                >
                  {item.trend === "up" ? (
                    <TrendingUp className="mr-0.5 -ml-1 h-5 w-5 shrink-0 self-center text-green-500" />
                  ) : (
                    <TrendingDown className="mr-0.5 -ml-1 h-5 w-5 shrink-0 self-center text-red-500" />
                  )}

                  <span className="sr-only">
                    {" "}
                    {item.trend === "up" ? "Increased" : "Decreased"} by{" "}
                  </span>
                  {item.difference}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
