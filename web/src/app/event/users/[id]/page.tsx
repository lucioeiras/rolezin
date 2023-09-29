'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Envelope, IdentificationCard } from '@phosphor-icons/react'

import api from '@/config/api'
import UserInterface from '@/@types/User'
import EventInterface from '@/@types/Event'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default function UsersEventPage({ params }: { params: { id: string } }) {
  const [users, setUsers] = useState<UserInterface[]>([])
  const [event, setEvent] = useState<EventInterface>()

  useEffect(() => {
    api.get(`/event/${params.id}`).then(({ data }) => setEvent(data))
    api.get(`/purchase/users/${params.id}`).then(({ data }) => setUsers(data))
  }, [params.id])

  return (
    <main className="flex justify-center p-20">
      <div className="w-1/3 flex flex-col items-center">
        {BASE_URL && event?.image && (
          <Image
            src={BASE_URL + event?.image}
            alt="evento"
            width={1200}
            height={64}
            className="max-w-full rounded-md object-cover mb-8"
          />
        )}
        <h2 className="text-3xl text-slate-800 font-semibold text-center">
          Veja quem comprou esse evento
        </h2>
        <p className="text-center mt-4 text-slate-500">
          Faça o controle de usuários e pagamentos do seu evento por aqui.
        </p>
        <ul className="w-full mt-8 flex flex-col gap-9">
          {users.map((user) => (
            <li key={user.id}>
              <div className="flex items-center gap-6">
                {user.photo && (
                  <Image
                    src={`${BASE_URL}${user.photo}`}
                    alt={user.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                )}

                <div>
                  <p className="text-slate-800 text-xl font-medium">
                    {user.name}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Envelope size={20} color="#64748b" />
                      <p className="text-slate-600">{user.email}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <IdentificationCard size={20} color="#64748b" />
                      <p className="text-slate-600">{user.document}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
