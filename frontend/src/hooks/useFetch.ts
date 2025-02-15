import { useEffect, useState } from "react"

type Params = {
    data: any, // data : {} | null | [],
    isLoading: boolean,
    error: any // error : Error | null
}

export function useFetch(url: string) {
    const [req, setReq] = useState<Params>({
        data : null,
        isLoading : true,
        error : null
    })

    // const {data, isLoading, error} = req;

    async function getData() {
        try {
            const res = await fetch(url)
            const data = await res.json()
            setReq({
                data,
                isLoading: false,
                error: res.ok ? null : Error(data)
            })
        } catch (error) {
            setReq({
                data: null,
                isLoading: false,
                error: error
            })
        }

    }

    useEffect(() => {
        if (!url) {
            setReq({ data: null, isLoading: false, error: Error("Invalid Url") })
            return
        }
        getData()
    }, [url])

    /*  return {
        data,
        isLoading,
        error
    } */
    return { ...req }
}