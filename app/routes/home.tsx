import type { Route as RouteType } from "./+types/home";

export function meta({}: RouteType.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4 gap-10">
      <h1 className="text-4xl">Fede&apos;s Lab</h1>

      <p>Insert 3D lab scene</p>
    </main>
  );
}
