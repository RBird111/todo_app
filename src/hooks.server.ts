import type { Handle } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event);
	}

	// find the user based on the session
	const user = await prisma.user.findUnique({
		where: { authToken: session },
		select: {
			id: true,
			firstName: true,
			lastName: true,
			username: true,
			email: true,
			updatedAt: true,
			createdAt: true,
			tasks: true
		}
	});

	// if `user` exists set `events.local`
	if (user) event.locals.user = { ...user };

	// load page as normal
	return await resolve(event);
};
