import { useAuth } from '@clerk/nextjs'

export const AuthCheck = () => {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <div>Please sign in to continue</div>
  }

  return <div>Welcome to your dashboard</div>
} 