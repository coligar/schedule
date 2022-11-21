import axios from 'axios'
import { toast } from 'react-toastify'
import useSWR, { mutate } from 'swr'

interface IUser
{
  email: string
  name: string
  role?: string
  avatar?: string
}

interface IGetUserData
{
  onClick: (data:IUser) => void
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const UsersSimpleList = (props: IGetUserData) =>
{
    const {data: user} = useSWR('/api/user', fetcher)

    const editUser = async (id:string) =>
    {
        await axios.get(`api/user/${id}`).then(res => res.data).then((res)=>
        {
        let dados = 
        {
            id: res.id,
            name: res.name,
            lastname: res.lastname,
            email: res.email,
            role: res.role,
            sex: res.sex
        }

        props.onClick(dados)

        }).catch((error) => 
        {
        toast.error(error, { hideProgressBar: false, autoClose: 2000 })
        })
    }

    const deleteUser = async (id:string) =>
    {
        return await axios.delete(`api/user/${id}`).then(res => 
        {
        toast.success('Usuário excluído com sucesso', { hideProgressBar: false, autoClose: 2000 })
        }).catch((error) =>
        {
        toast.error(error, { hideProgressBar: false, autoClose: 2000 })
        }).then(() => 
        {
        mutate('/api/user')
        })
    }

    return(
        <>
        <h2>usuários</h2>
        <ul>
            {((!user || user === undefined) &&
            <li>Carregando</li>
            )}
            { (user && user !== undefined) &&
            user.map((user:any) => (
            <li key={user.id}>
                <span onClick={() => editUser(user.id)}>{user.name} - Role: {user.role.toLowerCase()}</span> -
                <span onClick={() => deleteUser(user.id)}>excluir</span>
            </li>
            ))}
        </ul>
        </>
    )
}

export default UsersSimpleList