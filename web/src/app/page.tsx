import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  if (!user) return <div>No userr</div>;

  return (
    <div>
      <div>Authenticated</div>
    </div>
  );
}
