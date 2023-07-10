import prisma from '$lib/prisma';
import bcrypt from 'bcryptjs';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// Check email exists
		const email = data.get('email');
		if (!email) return fail(400, { missingEmail: true });

		// Check password exists
		const password = data.get('password');
		if (!password) return fail(400, { missingPassword: true });

		// Check user exists
		const user = await prisma.user.findFirst({
			where: {
				email: email.toString()
			}
		});

		if (!user) return fail(400, { incorrectEmail: true });

		// Check if password is valid
		const validPassword = await bcrypt.compare(
			password.toString(),
			user.hashedPassword
		);
		if (!validPassword) return fail(400, { incorrectPassword: true });

		return { success: true, user: user };
	}
} satisfies Actions;
