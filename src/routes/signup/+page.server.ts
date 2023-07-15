import prisma from '$lib/server/prisma';
import bcrypt from 'bcryptjs';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		// Check firstName exists
		const firstName = data.get('firstName')?.toString();
		if (!firstName) return fail(400, { missingFirstName: true });

		// Check lastName exists
		const lastName = data.get('lastName')?.toString();
		if (!lastName) return fail(400, { missingLastName: true });

		// Check username exists
		const username = data.get('username')?.toString();
		if (!username) return fail(400, { missingUsername: true });

		// Check email exists
		const email = data.get('email')?.toString();
		if (!email) return fail(400, { missingEmail: true });

		// Check password exists
		const password = data.get('password')?.toString();
		if (!password) return fail(400, { missingPass: true });

		// Check confirmPassword exists
		const confirmPassword = data.get('confirmPassword')?.toString();
		if (!confirmPassword) return fail(400, { missingConfirmPass: true });

		if (password !== confirmPassword) return fail(400, { noMatch: true });

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

			locals.user = { ...user };

			throw redirect(302, '/');
		} catch {
			// username/email taken
			return fail(400, { nonUnique: true });
		}
	}
} satisfies Actions;
