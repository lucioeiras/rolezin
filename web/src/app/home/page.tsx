'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  At,
  PencilSimple,
  SignOut,
  Trash,
  Plus,
  CalendarBlank,
  User,
} from '@phosphor-icons/react'

import OrganizerContext, { OrganizerInterface } from '@/contexts/organizer'
import EventInterface from '@/@types/Event'

import api from '@/config/api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const router = useRouter()
  const organizerContext = useContext(OrganizerContext)

  const [organizer, setOrganizer] = useState<OrganizerInterface>()
  const [events, setEvents] = useState<EventInterface[]>()

  const [currentDate, setCurrentDate] = useState<string>()

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

    setCurrentDate(`${year}-${month}-${day}`)
  }, [])

  function isPassed(eventDate: string) {
    if (eventDate && currentDate) {
      const currentDateTimestamp = new Date(currentDate)
      const eventDateTimestamp = new Date(eventDate)

      if (eventDateTimestamp < currentDateTimestamp) {
        return true
      }
    }
  }

  function formatDate(date: string) {
    const splitedDate = date.split('-')
    return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
  }

  function logout() {
    organizerContext.logout()
    router.push('/signin')
  }

  async function deleteEvent(eventIndex: number) {
    if (events && events[eventIndex]) {
      await api.delete(`/event/${events[eventIndex].id}`)
      setEvents(
        (current) =>
          current && current.filter((_, index) => index !== eventIndex),
      )
    }
  }

  useEffect(() => {
    api
      .get(`/organizer/${organizerContext.data.id}`)
      .then(({ data }) => setOrganizer(data))

    api
      .get(`/organizer/events/${organizerContext.data.id}`)
      .then(({ data }) => setEvents(data))
  }, [organizerContext.data.id])

  return (
    <div className="flex flex-row">
      <aside
        style={{ width: 480 }}
        className="h-screen border-r border-slate-200 flex flex-col items-center"
      >
        {organizer?.thumb && (
          <Image
            src={BASE_URL + organizer.thumb}
            alt="thumbnail"
            width={400}
            height={112}
            className="w-full h-28 object-cover"
          />
        )}

        {organizer?.photo && (
          <Image
            className="rounded-full -mt-12 border-8 border-white"
            src={BASE_URL + organizer.photo}
            alt="photo"
            width={100}
            height={100}
          />
        )}

        <h2 className="font-semibold text-2xl mt-2 text-slate-800">
          {organizer?.name}
        </h2>

        <div className="flex items-center gap-1 mt-2">
          <At color="#64748b" />
          <span className="text-purple-600 font-medium">
            {organizer?.username}
          </span>
        </div>
        <p className="max-w-xs text-slate-500 mt-2 text-center">
          {organizer?.bio}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <Link
            href="/edit"
            className="flex items-center text-sm gap-3 py-3 px-8 bg-purple-700 bg-opacity-10 rounded-lg text-purple-600 font-semibold hover:bg-opacity-100 hover:text-white duration-300"
          >
            <PencilSimple weight="fill" size={16} />
            Editar organização
          </Link>

          <button
            onClick={logout}
            className="p-3 border-slate-200 border rounded-lg text-slate-500 hover:text-purple-600 duration-300"
          >
            <SignOut size={16} />
          </button>
        </div>
      </aside>

      <main className="w-full p-10">
        <div className="flex items-center gap-6">
          <h1 className="text-slate-800 font-semibold text-3xl">
            Seus eventos
          </h1>
          <Link
            href="/event/create"
            className="mt-1 flex items-center justify-center gap-2 text-purple-600 hover:text-purple-800 duration-300"
          >
            <Plus size={16} weight="bold" />
            <h3 className="font-semibold text-base">Criar novo evento</h3>
          </Link>
        </div>

        <ul className="w-full mt-8 grid gap-6 grid-cols-3 grid-rows-3">
          {events &&
            events.map((event, index) => (
              <li
                key={event.id}
                className="w-full border border-slate-200 rounded-lg"
              >
                {event.image && (
                  <Image
                    src={BASE_URL + event.image}
                    alt="evento"
                    width={1200}
                    height={48}
                    className={`max-w-full h-40 rounded-t-md object-cover ${
                      isPassed(event.date) ? 'grayscale opacity-60' : ''
                    }`}
                  />
                )}

                <div className="p-6">
                  <h3 className="text-slate-800 font-semibold text-2xl">
                    {event.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-slate-600">
                    <CalendarBlank size={20} color="#94a3b8" />
                    <p className="">{formatDate(event.date)}</p>
                    {isPassed(event.date) && (
                      <span className="bg-slate-100 text-slate-500 py-1 px-3 text-xs rounded-full">
                        Já passou!
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-5 mt-4">
                    <Link
                      href={`/event/users/${event.id}`}
                      className="flex items-center gap-2 text-slate-400 hover:text-purple-600 duration-300"
                    >
                      <User size={20} />
                      <span className="font-medium">Usuários</span>
                    </Link>

                    <Link
                      href={`/event/edit/${event.id}`}
                      className="flex items-center gap-2 text-slate-400 hover:text-purple-600 duration-300"
                    >
                      <PencilSimple size={20} />
                      <span className="font-medium">Editar</span>
                    </Link>

                    <button
                      onClick={() => deleteEvent(index)}
                      className="flex items-center gap-2 text-slate-400 hover:text-red-400 duration-300"
                    >
                      <Trash size={20} />
                      <span className="font-medium">Deletar</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </main>
    </div>
  )
}
