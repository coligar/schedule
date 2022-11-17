import type {NextPage} from 'next'
import {useForm} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
      } = useForm<IFormInput>();

    if(dados || dados !== undefined)
    {
        setValue("name", dados.name);
        setValue("color", dados.color)
    }
    
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
            toast.success("Área de atuação salva com sucesso")
            reset({
                name:'',
                color:'',
            })
            
            console.log('sucesso')
        } 
        else 
        {
            toast.error("An unexpected error occurred while saving, please try again")
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Cadastro de áreas de atuação</h3>
            <label htmlFor="name">Nome</label>
            <input type="text" autoComplete="name" {...register("name", {required: true, maxLength:20})} />
            {errors?.name?.type === "required" && <p className='error'>Campo NOME é obrigatório</p>}
            {errors?.name?.type === "maxLength" && (<p className='error'>O campo NOME não pode ser maior que 20 carcteres</p>)}
            
            <label htmlFor="color">Cor</label>
            <input type="text" autoComplete="color" {...register("color", {required: true, maxLength:11})} />
            {errors?.color?.type === "required" && <p className='error'>Campo COR é obrigatório</p>}
            {errors?.color?.type === "maxLength" && (<p className='error'>O campo COR não pode ser maior que 11 carcteres</p>)}
            
            <button disabled={isSubmitting}>
            {isSubmitting ? "salvando..." : "Submit"}
        </button>
        </form>
    );
}

export default ActivityForm