import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password} : UserRequest) {
        if(!email) throw new Error("Email incorreto!")
        
        // verifica se o email ja esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExists) throw new Error("Usuário já existente")

        const passwordHash = await hash(password, 8) // senha criptografada

        const user = await prismaClient.user.create({
            data: {
                name: name, 
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        return user
    }
}

export { CreateUserService }