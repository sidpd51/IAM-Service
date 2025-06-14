import { createUser } from "../repositories/user.repository";
import { prisma } from "./client";
import { roles } from "./samples/role";
import { users } from "./samples/user";

async function main() {
    for (const role of roles) {
        await prisma.role.create({
            data: role
        });
    }

    for (const user of users) {
        await createUser(user);
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})