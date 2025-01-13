import {ArrowLeft} from "lucide-react";

export default function Home() {

    return (
      <main className={"flex space-x-2 items-center animate-pulse"}>
          <ArrowLeft className={"w-12 h-12"}/>
          <h1 className={"font-bold"}>
              Get Started with creating new document
          </h1>
      </main>
  );
}
