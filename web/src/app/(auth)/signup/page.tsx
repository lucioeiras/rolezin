'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useContext, useState, FormEvent } from 'react'

import {
  EnvelopeSimple,
  Key,
  At,
  Smiley,
  ShieldCheck,
  UserPlus,
  PencilSimple,
} from '@phosphor-icons/react'

import OrganizerContext from '@/contexts/organizer'

export default function SignUpPage() {
  const router = useRouter()
  const organizerContext = useContext(OrganizerContext)

  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (password === confirmPassword) {
      await organizerContext.register(name, username, bio, email, password)
      router.push('/home')
    }
  }

  return (
    <main className="flex h-screen max-h-screen">
      <div className="relative flex min-h-full w-full overflow-hidden">
        <div className="relative z-30 p-16 max-w-5xl flex flex-col justify-end">
          <Image src="rolezin-white.svg" alt="Viasat" width={64} height={83} />

          <div>
            <h1 className="text-5xl text-white font-semibold my-6 line leading-snug">
              Mude a forma como você vê as festas universitárias que você
              organiza
            </h1>

            <p className="text-lg text-slate-400">
              Tenha mais controle, consiga mais público e fature mais com seus
              eventos.
            </p>
          </div>
        </div>

        <div className="absolute top-0 z-20 w-auto min-w-full min-h-full max-w-none image-background"></div>

        <Image src="/signup.jpg" alt="Festa" fill={true} />
      </div>

      <div className="w-1/2 p-20 flex flex-col items-center overflow-y-scroll">
        <h2 className="text-3xl text-slate-800 font-semibold text-center">
          Crie sua conta
        </h2>
        <p className="text-center mt-4 text-slate-500">
          Se você já possui conta,{' '}
          <Link href="/signin" className="underline">
            faça seu login aqui
          </Link>
          .
        </p>

        <form className="w-full mt-10" onSubmit={(e) => onSubmit(e)}>
          <div>
            <label htmlFor="name" className="text-slate-600">
              Nome
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <Smiley size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="name"
                type="text"
                placeholder="Digite o nome da sua organização"
                className="placeholder-slate-400 w-full text-slate-700"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="username" className="text-slate-600">
              Username
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <At size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="username"
                type="text"
                placeholder="Digite o seu nome de usuário"
                className="placeholder-slate-400 w-full text-slate-700"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="bio" className="text-slate-600">
              Bio
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <PencilSimple size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="bio"
                type="text"
                placeholder="Escreva a sua biografia"
                className="placeholder-slate-400 w-full text-slate-700"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="email" className="text-slate-600">
              E-mail
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <EnvelopeSimple size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="email"
                type="email"
                placeholder="Digite o seu melhor e-mail"
                className="placeholder-slate-400 w-full text-slate-700"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="password" className="text-slate-600">
              Senha
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <Key size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="password"
                type="password"
                placeholder="Digite a sua senha mais segura"
                className="placeholder-slate-400 w-full text-slate-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="confirm" className="text-slate-600">
              Confirme sua senha
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <ShieldCheck size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="confirm"
                type="password"
                placeholder="Digite a senha novamente"
                className="placeholder-slate-400 w-full text-slate-700"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex text-white bg-purple-600 rounded-lg w-full p-4 items-center justify-center cursor-pointer mt-8 hover:bg-purple-900 duration-300"
          >
            <UserPlus weight="bold" className="mr-4" />
            Criar conta
          </button>
        </form>
      </div>
    </main>
  )
}
