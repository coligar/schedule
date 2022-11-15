import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url:string) => axios.get(url).then(res => res.data)

export const useGetData = (url:string) =>
{
    const { data, error } = useSWR(url, fetcher)
    return { data, error }
}

