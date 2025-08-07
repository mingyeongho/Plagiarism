import Space from "@/components/common/Space";

export default function Home() {
  return (
    <main className="relative">
      <section className="fixed top-0 left-0 w-full h-svh z-[-1]">
        <div className='bg-[url("/homepage_background.svg")] bg-no-repeat bg-cover bg-center h-svh w-svw' />
        <Space />
      </section>
      <section className="h-svh flex justify-center items-center">
        <h1 className="text-center text-white text-2xl sm:text-3xl md:text-5xl xl:text-7xl font-extrabold tracking-tight text-balance select-none">
          Plagiarism Component
        </h1>
      </section>
      <section className="bg-transparent h-svh">
        <p>Hello</p>
      </section>
    </main>
  );
}
