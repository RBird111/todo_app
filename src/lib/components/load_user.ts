import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const user = await prisma.user.findUnique({
    where: { id: 1 },
    include: { tasks: true },
  });

  return { user };
}) satisfies PageServerLoad;

const formatDate = (date: Date) => {
  let dStr = new Date(date).toISOString();

  // [[%Y], [%M], [%D]]
  let dArr: string[] = dStr.split("T")[0].split("-");

  // "%M/%D/%Y"
  return [dArr[1], dArr[2], dArr[0]].join("/");
};
