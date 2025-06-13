import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { RoleType } from "../dto/user.dto";
import { prisma } from "../prisma/client";
import { ConflictError } from "../utils/errors/app.error";

export const AddRoleToUser = async (roleId: string, userId: string, roleType: string) => {
    try {
        await prisma.userRole.create({
            data: {
                userId: userId,
                roleId: roleId,
                isAdmin: roleType === RoleType.ADMIN,
                assignedAt: new Date()
            }
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new ConflictError("The role is already assigned to this user");
            }
        }
        throw error;
    }
}
