import axios from 'axios'
import { toast } from 'react-toastify'
import useSWR, { mutate } from 'swr'

interface IGetActivityAreas
{
  onClick: (data:any) => void
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const ActivityFormList = (props: IGetActivityAreas) =>
{

    const {data: activity} = useSWR('/api/activity', fetcher)

    const editActivityArea = async (id:string) =>
    {
        let data = await axios.get(`api/activity/${id}`).then(res => res.data)
        props.onClick(data)
    }

    const deleteActivityArea = async (id:string) =>
    {
        return await axios.delete(`api/activity/${id}`).then(res => 
        {
            toast.success('Área de atuação excluída com sucesso', { hideProgressBar: false, autoClose: 2000 })
        }).catch((error) =>
        {
        toast.error(error, { hideProgressBar: false, autoClose: 2000 })
        }).then(() => 
        {
        mutate('/api/activity')
        })
    }

    return(
        <>
        <h2>Áreas de atuação</h2>
        <ul>
            {((!activity || activity === undefined) &&
            <li>Carregando</li>
            )}
            { (activity && activity !== undefined) &&
            activity.map((activity:any) =>(
                <li key={activity.id} >
                <span onClick={() => editActivityArea(activity.id)}>Nome: {activity.name} | Cor: {activity.color}</span> -  
                <span onClick={() => deleteActivityArea(activity.id)}>excluir</span>
                </li>
            ))
            }
        </ul>
        </>
    )
}

export default ActivityFormList