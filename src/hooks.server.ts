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
		include: { tasks: true }
	});

	// if `user` exists set `events.local`
	if (user)
		event.locals.user = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			tasks: user.tasks,
			updatedAt: user.updatedAt,
			createdAt: user.createdAt
		};

	// load page as normal
	return await resolve(event);
};
