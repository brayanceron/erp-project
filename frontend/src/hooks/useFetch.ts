import { useEffect, useState } from "react"

type Params = {
    data: any, // data : {} | null | [],
    isLoading: boolean,
    error : Error | null // error: any
    res: Response | null // res: any
}

export function useFetch(url: string) {
    const [req, setReq] = useState<Params>({ data: null, isLoading: true, error: null, res: null })
    // const {data, isLoading, error} = req;

    async function getData() {
        try {
            const res = await fetch(url, {credentials : 'include'})
            const data = await res.json()
            setReq({
                data,
                isLoading: false,
                error: res.ok ? null : Error(data.message), // error: res.ok ? null : Error(data),
                res
            })
        } catch (error) {
            setReq({
                data: null,
                isLoading: false,
                error: new Error(error instanceof Error ? error.message : `Se ha presentado un error: ${error}`), // error: error,
                res: null
            })
        }

    }

    useEffect(() => {
        // setReq({ data: null, isLoading: true, error: null, res: null }) // reset isLoading
        if (!url) {
            setReq({ data: null, isLoading: false, error: Error("Invalid Url"), res: null })
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