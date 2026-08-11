import { prisma } from "../src/lib/prisma.js";

async function main() {
    await prisma.contact.createMany({
        data: [
            {
                name: "Leanne Graham",
                phone: "1-770-736-8031",
                email: "leanne@gmail.com",
                note: "Friend",
            },
            {
                name: "Ervin Howell",
                phone: "010-692-6593",
                email: "ervin@gmail.com",
                note: "Work",
            },
            {
                name: "Clementine Bauch",
                phone: "1-463-123-4447",
                email: "clementine@gmail.com",
                note: "College",
            },
        ],
    });

    console.log("Database seeded");
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });