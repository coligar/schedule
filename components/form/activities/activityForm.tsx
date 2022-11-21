import type {NextPage} from 'next'
import {useForm, UseFormSetValue} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify';
import axios from 'axios';
import { mutate } from 'swr';
import { useEffect } from 'react';

interface IFormInput 
{
    name: string
    color: string
}

interface Props 
{
    url: string
    type: string
    dados: any
}

const fieldvalidations = yup.object({
    name: yup.string().required('Campo obrigatório').max(20,'Permitido no máximo 20 caracteres'),
    color: yup.string().required('Campo obrigatório').max(11, 'Permitido no máximo 11 caracteres'),
})

const setInputValues = (data:any, setValue:UseFormSetValue<IFormInput>) =>
{
    if(data || data !== undefined)
    {
        setValue("name", data.name);
        setValue("color", data.color)
    }
}

const ActivityForm: NextPage<Props> = (props) => 
{
    const { url, type, dados } = props

    const {
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
        
        if (response.status === 400) 
        {
            const fieldToErrorMessage:{[fieldName: string]: string} = await response.json()
            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) 
            {
                toast.error(`Erro: ${errorMessage} `)
            }
        } 
        else if (response.ok) 
        {
            if(!dados || dados === undefined)
            {
                reset({
                    name:'',
                    color:'',
                })
            }

            toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
            mutate('/api/activity');
        } 
        else 
        {
            toast.error(resp.message, { hideProgressBar: false, autoClose: 2000 })
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Cadastro de áreas de atuação</h3>
            <label htmlFor="name">Nome</label>
            <input type="text" autoComplete="name" {...register("name", {required: true, maxLength:20})} />
            <p className='error'>{errors.name?.message}</p>
            
            <label htmlFor="color">Cor</label>
            <input type="text" autoComplete="color" {...register("color", {required: true, maxLength:11})} />
            <p className='error'>{errors.color?.message}</p>
            
            <button disabled={isSubmitting}>
            {isSubmitting ? "salvando..." : "Submit"}
        </button>
        </form>
    );
}

export default ActivityForm