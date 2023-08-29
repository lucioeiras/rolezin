'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useState } from 'react'

import { EnvelopeSimple, Key, SignIn } from '@phosphor-icons/react'

import OrganizerContext from '@/contexts/organizer'

export default function SignInScreen() {
  const router = useRouter()
  const organizerContext = useContext(OrganizerContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    await organizerContext.login(email, password)
    router.push('/home')
  }

  return (
    <main className="flex h-screen max-h-screen">
      <div className="relative flex min-h-full w-full overflow-hidden">
        <div className="relative z-30 p-16 max-w-5xl flex flex-col justify-end">
          <Image src="rolezin-white.svg" alt="Viasat" width={64} height={83} />

          <h1 className="text-5xl text-white font-semibold my-6 line leading-snug">
            Mude a forma como você vê as festas universitárias que você organiza
          </h1>

          <p className="text-lg text-slate-400">
            Tenha mais controle, consiga mais público e fature mais com seus
            eventos.
          </p>
        </div>

        <div className="absolute top-0 z-20 w-auto min-w-full min-h-full max-w-none image-background"></div>

        <Image src="/signin.jpg" alt="Festa" fill={true} />
      </div>

      <div className="w-1/2 p-20 flex flex-col items-center justify-center">
        <h2 className="text-3xl text-slate-800 font-semibold text-center">
          Entre na sua conta
        </h2>
        <p className="text-center mt-4 text-slate-500">
          Se você ainda não possui conta, crie uma{' '}
          <Link href="/signup" className="underline">
            clicando aqui.
          </Link>
        </p>

        <form className="w-full mt-10" onSubmit={(e) => onSubmit(e)}>
          <div>
            <label htmlFor="email" className="text-slate-600">
              E-mail
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <EnvelopeSimple size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="email"
                type="email"
                placeholder="Digite o e-mail cadastrado"
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
                placeholder="Digite a sua senha"
                className="placeholder-slate-400 w-full text-slate-700"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex text-white bg-purple-600 rounded-lg w-full p-4 items-center justify-center cursor-pointer mt-8 hover:bg-purple-900 duration-300"
          >
            <SignIn weight="bold" className="mr-4" />
            Acessar a plataforma
          </button>
        </form>
      </div>
    </main>
  )
}
