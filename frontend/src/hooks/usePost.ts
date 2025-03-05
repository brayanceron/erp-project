import { useEffect, useState } from "react";
export type paramsPost = {
    body: any,
    data: any | null,
    isLoading: boolean,
    error: null | Error,
    res: null | Response,
}
export function usePost(url: string, body: any, callback: (params: paramsPost) => void, method = 'POST') {
    const [req, setReq] = useState<paramsPost>({ body, data: null, isLoading: false, error: null, res: null }) //initial state

    async function sendReq() {
        setReq({ body, data: null, isLoading: true, error: null, res: null }) // reset isLoading
        if (!url) {
            setReq({ body, data: null, isLoading: false, error: Error("Invalid Url"), res: null })
            return
        }
        try {
            let res = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            let data = await res.json();
            setReq({
                body,
                data,
                isLoading: false,
                error: res.ok ? null : Error(data.message),
                res
            })

        } catch (error) {
            console.log(error);
            setReq({
                body,
                data: null,
                isLoading: false,
                error: Error(error instanceof Error ? error.message : `Se ha presentado un error: ${error}`),
                res: null
            })
        }
    }

    useEffect(() => {
        if (req.isLoading || (req.error === null && req.res === null))  return 
        callback(req)
    }, [req])

    return { ...req, sendReq }
}