import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { User, Account, Profile } from "next-auth/core/types"

interface AuthUser extends User{
  token?: string | null
}


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    // async signIn( user: AuthUser, account: Account ) {
      
    //   if (account?.provider === "google") {
    //     const { id_token } = account
    //     const { token } = await fetch(`http://localhost:8080/api/v1/users/auth/google/`,
    //       {
    //         method: "POST",
    //         headers: new Headers({
    //           'Content-Type': 'application/json',
    //           'Authorization': id_token as string
    //         })
    //       }
    //     )
    //       .then((res) => {
    //         return res.json()
    //       })
    //       .catch(() => {
    //         return false
    //       })
    //       user.token = token
    //       console.log(user)
    //   }
    //   return true
    // },
    async session({ session, user, token }) {
      return session
    },
    // async jwt( token, user, account, profile, isNewUser) {
    //   return token
    // }
  }
})