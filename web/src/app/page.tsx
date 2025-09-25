import prisma from "@/prisma/lib/prisma";
import { notFound } from "next/navigation";

export default async function Home() {
  return (
    <div>
      <div>Hello!</div>
    </div>
  );
}
