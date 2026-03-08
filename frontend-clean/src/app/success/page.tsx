"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Success() {

  const router = useRouter()

  useEffect(() => {

    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get("session_id")

    if (!sessionId) return

    async function login() {

      const res = await fetch(`/api/session?session_id=${sessionId}`)
      const data = await res.json()

      if (!data.email) return

      const login = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email
        })
      })

      if (login.ok) {
        router.push("/dashboard")
      }

    }

    login()

  }, [])

  return <p>Finalizando pagamento...</p>

}

