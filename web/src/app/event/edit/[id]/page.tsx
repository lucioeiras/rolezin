'use client'

import { useRouter } from 'next/navigation'
import { useContext, useState, useEffect, FormEvent } from 'react'

import {
  MapPin,
  Key,
  Confetti,
  CalendarPlus,
  HourglassHigh,
  HourglassLow,
  PencilSimple,
} from '@phosphor-icons/react'

import api from '@/config/api'

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [startHour, setStartHour] = useState<string>('')
  const [endHour, setEndHour] = useState<string>('')
  const [location, setLocation] = useState<string>('')

  const [image, setImage] = useState<File>()

  const [minimumDate, setMinimumDate] = useState<string>()

  useEffect(() => {
    const dateObject = new Date()

    const day =
      dateObject.getDate() < 10
        ? '0' + dateObject.getDate()
        : dateObject.getDate()
    const month =
      dateObject.getMonth() < 10
        ? '0' + (dateObject.getMonth() + 1)
        : dateObject.getMonth() + 1
    const year = dateObject.getFullYear()

    setMinimumDate(`${year}-${month}-${day}`)
  }, [])

  useEffect(() => {
    api.get(`/event/${params.id}`).then(({ data }) => {
      setName(data.name)
      setDescription(data.description)
      setDate(data.date)
      setStartHour(data.startHour)
      setEndHour(data.endHour)
      setLocation(data.location)
    })
  }, [params.id])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    const { data } = await api.put(`/event/${params.id}`, {
      name,
      description,
      date,
      startHour,
      endHour,
      location,
    })

    const formData = new FormData()

    if (image) {
      formData.append('image', image)
      await api.put(`/event/image/${data.id}`, formData)
    }

    router.push('/home')
  }

  return (
    <main className="flex justify-center p-20">
      <div className="w-1/3 flex flex-col items-center">
        <h2 className="text-3xl text-slate-800 font-semibold text-center">
          Edite seu evento
        </h2>
        <p className="text-center mt-4 text-slate-500">
          Mude o que você precisar para fornecer as melhores informações para
          quem vai no seu evento!.
        </p>

        <form className="w-full mt-10" onSubmit={(e) => onSubmit(e)}>
          <div>
            <label htmlFor="image" className="text-slate-600">
              Imagem de divulgação
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="placeholder-slate-400 w-full text-slate-700 mt-4 border-0"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="name" className="text-slate-600">
              Nome do evento
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <Confetti size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="name"
                type="text"
                placeholder="Digite o nome do seu evento"
                className="placeholder-slate-400 w-full text-slate-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="text-slate-600">
              Descrição
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <PencilSimple size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="description"
                type="text"
                placeholder="Descreva seu evento"
                className="placeholder-slate-400 w-full text-slate-700"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="date" className="text-slate-600">
              Data
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <CalendarPlus size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="date"
                type="date"
                min={minimumDate}
                className="placeholder-slate-400 w-full text-slate-700"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div className="w-full">
              <label htmlFor="start" className="text-slate-600">
                Início
              </label>
              <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
                <HourglassHigh size={24} color="#A0AEC0" className="mr-4" />
                <input
                  name="start"
                  type="time"
                  className="placeholder-slate-400 w-full text-slate-700"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="end" className="text-slate-600">
                Fim
              </label>
              <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
                <HourglassLow size={24} color="#A0AEC0" className="mr-4" />
                <input
                  name="end"
                  type="time"
                  className="placeholder-slate-400 w-full text-slate-700"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="location" className="text-slate-600">
              Localização
            </label>
            <div className="flex mt-2 p-5 border-gray-200 border rounded-lg">
              <MapPin size={24} color="#A0AEC0" className="mr-4" />
              <input
                name="location"
                type="text"
                placeholder="Digite onde será o evento"
                className="placeholder-slate-400 w-full text-slate-700"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-purple-600 rounded-lg w-full p-4 mt-8 hover:bg-purple-900 duration-300"
          >
            Editar evento
          </button>
        </form>
      </div>
    </main>
  )
}