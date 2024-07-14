"use client"
import React from "react"
import scss from "./TelegramContact.module.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

interface IFormTelegram {
	username: string
	email: string
	subject: string
	description: string
}

export const TelegramContact: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<IFormTelegram>()

	const messageModel = (data: IFormTelegram) => {
		let messageTelegram = `Usernaem: <b>${data.username}</b>\n`
		messageTelegram += `Email: <b>${data.email}</b>\n`
		messageTelegram += `Subject: <b>${data.subject}</b>\n`
		messageTelegram += `Description: <b>${data.description}</b>`
		return messageTelegram
	}

	const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN
	const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

	const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
		const message = messageModel(data)

		const { data: response } = await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
			chat_id: CHAT_ID,
			parse_mode: "html",
			text: message,
		})
		console.log(response)
		reset()
	}

	return (
		<section className={scss.telegram_contact}>
			<div className="container">
				<div className={scss.content}>
					<h1>Telegram Bot</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input placeholder="Username" type="text" {...register("username", { required: true })} />
						<input placeholder="Email" type="text" {...register("email", { required: true })} />
						<input placeholder="Subject" type="text" {...register("subject", { required: true })} />
						<input placeholder="Description" type="text" {...register("description", { required: true })} />
						{isSubmitting ? <button type="button">Sending</button> : <button type="submit">Submit</button>}
					</form>
				</div>
			</div>
		</section>
	)
}
