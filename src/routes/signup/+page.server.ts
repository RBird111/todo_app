import prisma from '$lib/server/prisma';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
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
		const hashedPassword = await bcrypt.hash(password.toString(), 10);

		// Catch errors thrown during user creation
		let user;
		try {
			user = await prisma.user.create({
				data: {
					firstName,
					lastName,
					username,
					email,
					hashedPassword
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
