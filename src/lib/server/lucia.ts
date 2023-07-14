import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { sveltekit } from 'lucia-auth/middleware';
import { dev } from '$app/environment';
import prisma from '$lib/server/prisma';

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (user) => ({
		userId: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		email: user.email
	})
});

export type Auth = typeof auth;
