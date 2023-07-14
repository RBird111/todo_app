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
		first_name: user.first_name,
		last_name: user.last_name,
		username: user.username,
		email: user.email
	})
});

export type Auth = typeof auth;
