import prisma from '$lib/server/prisma';
import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Prisma } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		// Check firstName exists
		const firstName = data.get('firstName')?.toString();
		if (!firstName) return fail(400, { firstName: true, missing: true });

		// Check lastName exists
		const lastName = data.get('lastName')?.toString();
		if (!lastName) return fail(400, { lastName: true, missing: true });

		// Check username exists
		const username = data.get('username')?.toString();
		if (!username) return fail(400, { username: true, missing: true });

		// Check email exists
		const email = data.get('email')?.toString();
		if (!email) return fail(400, { email: true, missing: true });

		// Check password exists
		const password = data.get('password')?.toString();
		if (!password) return fail(400, { password: true, missing: true });

		// Check confirmPassword exists
		const confirmPassword = data.get('confirmPassword')?.toString();
		if (!confirmPassword)
			return fail(400, { confirmPassword: true, missing: true });

		if (password !== confirmPassword)
			return fail(400, {
				password: true,
				confirmPassword: true,
				noMatch: true
			});

		try {
			const user = await prisma.user.create({
				data: {
					firstName,
					lastName,
					username,
					email,
					hashedPassword: await bcrypt.hash(password, 10),
					authToken: crypto.randomUUID()
				},
				include: { tasks: true }
			});

			cookies.set('session', user.authToken, {
				// send cookie for every page
				path: '/',
				// server side only cookie so you can't use `document.cookie`
				httpOnly: true,
				// only requests from same site can send cookies
				// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
				sameSite: 'strict',
				// only sent over HTTPS in production
				secure: process.env.NODE_ENV === 'production',
				// set cookie to expire after a day
				maxAge: 60 * 60 * 24
			});
		} catch (e) {
			// username/email taken
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if ((e.meta?.target as string[]).includes('username')) {
					return fail(400, { username: true, nonUnique: true });
				} else if ((e.meta?.target as string[]).includes('email')) {
					return fail(400, { email: true, nonUnique: true });
				}
			}
		}

		throw redirect(302, '/');
	}
} satisfies Actions;
