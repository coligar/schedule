import type {NextPage} from 'next'
import {useForm} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    dados: any
}

const UserSimpleForm: NextPage<Props> = (props) => 
{
    const { url, type, dados } = props;
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
        setValue("lastname", dados.lastname)
        setValue("email", dados.email)
        setValue("role", dados.role)
        setValue("sex", dados.sex)
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
                lastname:'',
                email:'',
                role: null,
                sex: null
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
            <h3>Cadastro rápido de usuários</h3>
            <label htmlFor="name">Nome</label>
            <input type="text" autoComplete="name" {...register("name", {required: true, maxLength:100})} />
            {errors?.name?.type === "required" && <p className='error'>Campo NOME é obrigatório</p>}
            {errors?.name?.type === "maxLength" && (<p className='error'>O campo NOME não pode ser maior que 100 carcteres</p>)}
            
            <label htmlFor="lastname">Sobrenome</label>
            <input type="text" autoComplete="lastname" {...register("lastname", {required: true, maxLength:100})} />
            {errors?.lastname?.type === "required" && <p className='error'>Campo SOBRENOME é obrigatório</p>}
            {errors?.lastname?.type === "maxLength" && (<p className='error'>O campo SOBRENOME não pode ser maior que 100 carcteres</p>)}

            <label htmlFor="email">E-mail</label>
            <input type="email" autoComplete="lastname" {...register("email", {required: true})} />
            {errors?.email?.type === "required" && <p className='error'>Campo E-MAIL é obrigatório</p>}

            <label htmlFor="role">Tipo de Usuário</label>
            <select {...register("role", {required: true})}>
                <option value="">Escolha uma opção</option>
                <option value="USER">Usuário</option>
                <option value="ADMIN">Administrador</option>
            </select>
            {errors?.role?.type === "required" && <p className='error'>Campo TIPO DE USUÁRIO é obrigatório</p>}

            <label htmlFor="sex">Sexo</label>
            <select {...register("sex", {required: true})}>
                <option value="">Escolha uma opção</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
            </select>
            {errors?.sex?.type === "required" && <p className='error'>Campo SEXO é obrigatório</p>}
            
            <button disabled={isSubmitting}>
            {isSubmitting ? "salvando..." : "Submit"}
        </button>
        </form>
    );
}

export default UserSimpleForm