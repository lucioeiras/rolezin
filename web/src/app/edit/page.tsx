'use client'

import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useContext, useState, useEffect, FormEvent } from 'react'

import {
  EnvelopeSimple,
  Key,
  At,
  Smiley,
  UserPlus,
  PencilSimple,
} from '@phosphor-icons/react'

import api from '@/config/api'

import OrganizerContext from '@/contexts/organizer'

export default function EditPage() {
  const router = useRouter()
  const organizerContext = useContext(OrganizerContext)

  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [photo, setPhoto] = useState<File>()
  const [thumb, setThumb] = useState<File>()

  useEffect(() => {
    api.get(`/organizer/${organizerContext.data.id}`).then(({ data }) => {
      setName(data.name)
      setUsername(data.username)
      setBio(data.bio)
      setEmail(data.email)
    })
  }, [organizerContext.data.id])

  function deleteAcount() {
    organizerContext.delete()
    router.push('/signin')
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    await organizerContext.update(name, username, bio, email, password)

    const formDataPhoto = new FormData()

    if (photo) {
      formDataPhoto.append('image', photo)
      organizerContext.updatePhoto(formDataPhoto)
    }

    const formDataThumb = new FormData()

    if (thumb) {
      formDataThumb.append('image', thumb)
      organizerContext.updateThumbnail(formDataThumb)
    }

    router.push('/home')
  }

  return (
    <main className="flex justify-center p-20">
      <div className="w-1/3 flex flex-col items-center">
        <h2 className="text-3xl text-slate-800 font-semibold text-center">
          Edite sua organização
        </h2>
        <p className="text-center mt-4 text-slate-500">
          Mude as informações que precisar sobre sua organização.
        </p>

        <form className="w-full mt-10" onSubmit={(e) => onSubmit(e)}>
          <div>
            <label htmlFor="thumb" className="text-slate-600">
              Foto de capa
            </label>
            <input
              name="thumb"
              type="file"
              accept="image/*"
              className="placeholder-slate-400 w-full text-slate-700 mt-4 border-0"
              onChange={(e) => e.target.files && setThumb(e.target.files[0])}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="photo" className="text-slate-600">
              Foto de perfil
            </label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              className="placeholder-slate-400 w-full text-slate-700 mt-4 border-0"
              onChange={(e) => e.target.files && setPhoto(e.target.files[0])}
            />
          </div>

          <div className="mt-6">
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
                value={name}
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
                value={username}
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
                value={bio}
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
                value={email}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex text-white bg-purple-600 rounded-lg w-full p-4 items-center justify-center cursor-pointer mt-8 hover:bg-purple-900 duration-300"
          >
            <PencilSimple size={20} weight="fill" className="mr-4" />
            Editar organização
          </button>

          <button
            onClick={deleteAcount}
            className="flex text-purple-600 font-semibold w-full items-center justify-center cursor-pointer mt-8 hover:text-purple-900 duration-300"
          >
            Deletar organização
          </button>
        </form>
      </div>
    </main>
  )
}
