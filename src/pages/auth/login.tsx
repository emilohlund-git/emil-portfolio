import LoginForm from '@/modules/login/LoginForm'
import { NextPage } from 'next'

type Props = {}

const Login: NextPage = (props: Props) => {
    return (
        <LoginForm />
    )
}

export default Login