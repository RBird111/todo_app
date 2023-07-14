import { PrismaClient } from '@prisma/client';
import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { sveltekit } from 'lucia-auth/middleware';
import seeds from './seed_data.json';

const prisma = new PrismaClient();
const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: 'DEV',
	middleware: sveltekit(),
	transformDatabaseUser: (user) => ({
		userId: user.id,
		first_name: user.first_name,
		last_name: user.last_name,
		username: user.username,
		email: user.email
	})
});

const main = async () => {
	console.log(`Start seeding ...`);

	for (const u of Object.values(seeds)) {
		const user = await auth.createUser({
			primaryKey: {
				providerId: 'email',
				providerUserId: u.email,
				password: u.password
			},
			attributes: {
				first_name: u.firstName,
				last_name: u.lastName,
				username: u.username,
				password: u.password,
				email: u.email,
				tasks: { create: u.tasks }
			}
		});
		const session = await auth.createSession(user.userId);
		console.log('Session =>', session);
		console.log(`Created user with id: ${user.id}`);
	}

	console.log(`Seeding finished.`);
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
