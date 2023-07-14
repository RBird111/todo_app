import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import seeds from './seed_data.json';
import { generateRandomString } from 'lucia-auth';

const prisma = new PrismaClient();

const main = async () => {
	console.log(`Start seeding ...`);

	for (const u of Object.values(seeds)) {
		const hashed_password = await bcrypt.hash(u.password, 10);
		const user = await prisma.authUser.create({
			data: {
				id: generateRandomString(15),
				first_name: u.firstName,
				last_name: u.lastName,
				username: u.username,
				email: u.email,
				hashed_password,
				tasks: {
					create: u.tasks
				}
			}
		});
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
