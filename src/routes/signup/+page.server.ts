import prisma from '$lib/server/prisma';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// Check firstName exists
		const first_name = data.get('firstName')?.toString();
		if (!first_name) return fail(400, { missingFirstName: true });

		// Check lastName exists
		const last_name = data.get('lastName')?.toString();
		if (!last_name) return fail(400, { missingLastName: true });

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
		const hashed_password = await bcrypt.hash(password.toString(), 10);

		// Catch errors thrown during user creation
		let user;
		try {
			user = await prisma.authUser.create({
				data: {
					first_name,
					last_name,
					username,
					email,
					hashed_password
				}
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					return fail(400, { emailInUse: true });
				}
			}
		}

		if (user) {
			return { success: true, user };
		}
	}
} satisfies Actions;
