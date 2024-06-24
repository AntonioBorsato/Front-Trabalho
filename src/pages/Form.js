//importação arquivos do projeto
import './Form.css';
import 'react-toastify/dist/ReactToastify.css';

//importação dos npm install
import React, { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().email({ message: "Email invalido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
})

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault();

        try {

            loginSchema.parse({ email, password });
            toast.success("Login efetuado com sucesso!!")
            navigate("/Characters")
            
        } catch (error) {

            if (error instanceof z.ZodError) {

                error.errors.forEach((err) => {

                    toast.error(err.message);

                });
            }
        }
    };

    return (
        <div className="container">
            <h2 className="title">Login</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="textMail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
                <hr className='line'></hr>
                <button type="submit" className="button">Entrar</button>
            </form>
        </div>
    );
};

export default Form;
