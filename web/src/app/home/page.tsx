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
} from '@phosphor-icons/react'

import OrganizerContext, { OrganizerInterface } from '@/contexts/organizer'
import { EventInterface } from '@/@types/Event'

import api from '@/config/api'

export default function Home() {
  const router = useRouter()
  const organizerContext = useContext(OrganizerContext)

  const [organizer, setOrganizer] = useState<OrganizerInterface>()
  const [events, setEvents] = useState<EventInterface[]>()

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
      <aside className="h-screen w-1/5 border-r border-slate-200 flex flex-col items-center">
        {organizer?.thumb && (
          <Image
            src={organizer.thumb}
            alt="thumbnail"
            width={400}
            height={112}
            className="w-full h-28 object-cover"
          />
        )}

        {organizer?.photo && (
          <Image
            className="rounded-full -mt-12 border-8 border-white"
            src={organizer.photo}
            alt="photo"
            width={100}
            height={100}
          />
        )}

        <h2 className="font-semibold text-2xl mt-2 text-slate-800">
          {organizer?.name}
        </h2>
        <p className="text-slate-500 mt-2 text-center">{organizer?.bio}</p>

        <div className="flex items-center gap-1 mt-2">
          <At color="#64748b" />
          <span className="text-slate-700">{organizer?.username}</span>
        </div>

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
            className="flex items-center justify-center gap-2 text-purple-600 hover:text-purple-800 duration-300"
          >
            <Plus size={16} weight="bold" />
            <h3 className="font-semibold text-base">Criar novo evento</h3>
          </Link>
        </div>

        <ul className="w-full mt-8 grid grid-flow-col gap-6 grid-cols-5">
          {events &&
            events.map((event, index) => (
              <li
                key={event.id}
                className="w-full border border-slate-200 rounded-lg"
              >
                {event.image && (
                  <Image
                    src={event.image}
                    alt="evento"
                    width={1200}
                    height={48}
                    className="max-w-full max-h-40 rounded-t-md object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="text-slate-800 font-semibold text-2xl">
                    {event.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-slate-700">
                    <CalendarBlank size={20} />
                    <p className="">{formatDate(event.date)}</p>
                  </div>

                  <div className="flex items-center gap-5 mt-4">
                    <Link
                      href={`/event/edit/${event.id}`}
                      className="flex items-center gap-2 text-slate-500 hover:text-purple-600 duration-300"
                    >
                      <PencilSimple size={20} />
                      <span className="font-medium">Editar</span>
                    </Link>

                    <button
                      onClick={() => deleteEvent(index)}
                      className="flex items-center gap-2 text-slate-500 hover:text-purple-600 duration-300"
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
