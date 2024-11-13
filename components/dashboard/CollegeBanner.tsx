export default function CollegeBanner() {
  return (
    <section
      className="h-[8rem] rounded-2xl flex flex-col  overflow-hidden"
      style={{
        background: `rgba(0, 80, 0, 0.8), url("/0.jpg") no-repeat center center / cover`,
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="h-4 bg-green-600 w-full"></div>
      <h1 className="md:text-3xl text-lg text-white text-center pt-10">
        <span className="opacity-75">COLLEGE OF </span>
        <span className="font-bold">COMPUTER STUDIES</span>
      </h1>
    </section>
  );
}
