import type {NextPage} from 'next'
import {useForm, UseFormSetValue} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { mutate } from 'swr'

interface IFormInput 
{
    name: string
    lastname: string
    email: string
    role: string | null
    sex: string | null
}

interface Props 
{
    url: string
    type: string
    dados: any | null
}

const fieldvalidations = yup.object({
    name: yup.string().required('Campo obrigatório').max(100,'Permitido no máximo 100 caracteres'),
    lastname: yup.string().required('Campo obrigatório').max(100, 'Permitido no máximo 100 caracteres'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    role: yup.string().required('Campo obrigatório'),
    sex: yup.string().required('Campo obrigatório')
})

const formfields: Array<string> = ['name', 'lastname', 'email', 'role', 'sex']

const setInputValues = (data:any, setValue:UseFormSetValue<IFormInput>) =>
{
    if(data || data !== undefined)
    {
        setValue("name", data.name);
        setValue("lastname", data.lastname)
        setValue("email", data.email)
        setValue("role", data.role)
        setValue("sex", data.sex)
    }
}

const UserSimpleForm: NextPage<Props> = (props) => 
{
    
    const { url, type, dados } = props;

    const 
    {
        register, 
        handleSubmit, 
        watch, 
        setError, 
        reset, 
        setValue, 
        formState: { isSubmitting, errors }
    } = useForm<IFormInput>(
        {
            resolver: yupResolver(fieldvalidations)
        }
    )

    useEffect(() =>
    {
        setInputValues(dados, setValue)

    },[dados, setValue])

    
    async function saveFormData(data: IFormInput) 
    {
        if(!dados || dados === undefined)
        {
            return await fetch(url, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            })
        }
        else
        {            
            return await fetch(`${url}/${dados.id}`, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: 'PUT'
            })
        }
    }


    const onSubmit = async (data: IFormInput) => 
    {
        const response = await saveFormData(data)
        let resp = await response.json()
        
        if (response.status === 400 || response.status === 500) 
        {
            const fieldToErrorMessage:{[fieldName: string]: string} = await response.json()

            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) 
            {
                toast.error(`Erro: ${errorMessage}`, { hideProgressBar: false, autoClose: 2000})
            }
        } 
        else if (response.ok) 
        {
            if(!dados || dados === undefined)
            {
                reset(
                {
                    name:'',
                    lastname:'',
                    email:'',
                    role: null,
                    sex: null
                })
            }

            toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
            mutate('/api/user');
        } 
        else 
        {
            toast.error(resp.message, { hideProgressBar: false, autoClose: 2000 })
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Cadastro rápido de usuários</h3>
            <label htmlFor="name">Nome</label>
            <input type="text" autoComplete="name" {...register("name")} />
            <p className='error'>{errors.name?.message}</p>
            
            <label htmlFor="lastname">Sobrenome</label>
            <input type="text" autoComplete="lastname" {...register("lastname")} />
            <p className='error'>{errors.lastname?.message}</p>

            <label htmlFor="email">E-mail</label>
            <input type="email" autoComplete="email" {...register("email", {required: true})} />
            <p className='error'>{errors.email?.message}</p>

            <label htmlFor="role">Tipo de Usuário</label>
            <select {...register("role")}>
                <option value="">Escolha uma opção</option>
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
            </select>
            <p className='error'>{errors.role?.message}</p>

            <label htmlFor="sex">Sexo</label>
            <select {...register("sex")}>
                <option value="">Escolha uma opção</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
            </select>
            <p className='error'>{errors.sex?.message}</p>
            
            <button disabled={isSubmitting}>
                {isSubmitting ? "salvando..." : "Submit"}
            </button>
        </form>
    );
}

export default UserSimpleForm