import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Navbar from './Navbar'
import Footer from './Footer'

const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>')

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
        <>
        <Navbar />
        <div className="mx-auto p-6 bg-slate-200">
            <div className="h-screen mx-auto max-w-sm">
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={['google']} magicLink />
            </div>
        </div>
        <Footer />
        </>
    )
  }
  else {
    return (<div>Logged in!</div>)
  }
}