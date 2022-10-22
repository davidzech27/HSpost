import passport from "passport"
import { Strategy } from "passport-google-oauth20"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { PrismaClient } from "@prisma/client"
import { Application } from "express"

// TODO: check if email is of a valid domain and redirect user accordingly. make redirects and messages constants

const initializeAuth = (app: Application, db: PrismaClient) => {
	app.use(cookieParser())

	app.use(passport.initialize())

	passport.use(
		new Strategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID!,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
				callbackURL: "/oauth/redirect"
			},
			async (_accessToken, _refreshToken, profile, done) => {
				try {
					const email = profile.emails?.[0].value ?? null

					if (
						!(
							email &&
							(await db.district.findUnique({
								where: {
									emailDomain: email.slice(
										email.indexOf("@") + 1
									)
								}
							}))
						)
					) {
						return done(null, false)
					}

					const name = profile.displayName
						.replaceAll("_", " ")
						.replaceAll("-", " ")
						.replaceAll(/[0-9]/gi, "")
						.split(" ")
						.slice(0, 2)
						.join(" ")

					const photo = profile.photos?.[0].value ?? null

					await db.user.upsert({
						create: {
							email,
							name,
							photo
						},
						update: {
							photo
						},
						where: {
							email
						}
					})

					return done(null, email)
				} catch (error: any) {
					return done(error)
				}
			}
		)
	)

	app.get(
		"/oauth/signin",
		passport.authenticate("google", {
			scope: ["email", "profile"]
		})
	)

	app.get("/oauth/redirect", async (req, res, next) =>
		passport.authenticate(
			"google",
			{ session: false },
			async (error, email) => {
				if (error) {
					console.error(error)
					await new Promise((resolve) => setTimeout(resolve, 5000)) // In case due to unexpected OAuth behavior this function is called multiple times, this avoids getting the runtime error for setting headers after they're sent to the client, while giving time for the code that runs on success to finish
					if (!res.writableEnded) {
						return res.redirect(`${process.env.CLIENT_URL}/500`)
					} else return
				}

				if (!email) {
					return res.redirect(`${process.env.CLIENT_URL}/signin`)
				}

				const refreshToken = jwt.sign(
					{ email },
					process.env.REFRESH_TOKEN_SECRET!,
					{
						expiresIn: "7d"
					}
				)

				res.cookie("refresh_token", refreshToken, {
					httpOnly: true,
					sameSite: "strict"
				})

				return res.redirect(process.env.CLIENT_URL!)
			}
		)(req, res, next)
	)

	app.use((req, _res, next) => {
		const authorization = req.headers["authorization"]

		if (!authorization) return next()

		const token = authorization.split(" ")[1]

		try {
			const email: string = (
				jwt.verify(
					token,
					process.env.ACCESS_TOKEN_SECRET!
				) as jwt.JwtPayload
			).email

			req.user = email
		} finally {
			return next()
		}
	})
}

export default initializeAuth
