import { prisma } from "../prisma/client";
import { NotFoundError } from "../utils/errors/app.error";

export const findRoleByName = async (roleType: string) => {
    try {
        const role = await prisma.role.findUnique({
            where: {
                name: roleType
            }
        });
        if (!role) {
            throw new NotFoundError(`Role doesn't exist with name: ${roleType}`);
        }
        return role;
    } catch (error) {
        throw error;
    }
}
