import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();

  if (!user) return <div>No userr</div>;

  return (
    <div>
      <div>Authenticated</div>
      <Button>hello</Button>
    </div>
  );
}
