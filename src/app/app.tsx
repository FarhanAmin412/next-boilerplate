import Image from "next/image";

export default function App() {
  return (
    <div className="flex w-screen h-screen justify-center items-center gap-y-10">
      <div className="flex flex-col justify-center items-center gap-y-10 border-fuchsia-600 border-2 border-solid rounded-xl p-6 sm:p-10 lg:p-14">
        <div className="text-teal-600 text-2xl md:text-3xl lg:text-4xl">
          dss
        </div>
        <Image
          className="rounded-xl md:w-[300px] md:h-[300px] md:rounded-3xl lg:w-[400px] lg:h-[400px]"
          src={
            "https://images.unsplash.com/photo-1643207937803-151ba45b7b42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="water image"
          width={200}
          height={200}
          loading="lazy"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
