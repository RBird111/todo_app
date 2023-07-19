import prisma from '$lib/server/prisma';
import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		// Check credential exists
		const credential = data.get('credential')?.toString();
		if (!credential) return fail(400, { missingCredential: true });

		// Check for user
		const user = await prisma.user.findUnique({
			where: {
				[credential.includes('@') ? 'email' : 'username']: credential
			}
		});

		if (!user) return fail(400, { invalidCredentials: true });

		// Check password exists
		const password = data.get('password')?.toString();
		if (!password) return fail(400, { missingPassword: true });

		// Check if password is valid
		const userPassword = await bcrypt.compare(password, user.hashedPassword);
		if (!userPassword) return fail(400, { invalidPassword: true });

		// Generate new auth token
		const authenticatedUser = await prisma.user.update({
			where: { username: user.username },
			data: { authToken: crypto.randomUUID() },
			include: { tasks: true }
		});

		cookies.set('session', authenticatedUser.authToken, {
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

		throw redirect(302, '/');
	}
} satisfies Actions;
