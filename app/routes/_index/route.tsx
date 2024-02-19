import plusIcon from "./plusIcon.svg";

export default function Index() {
  return (
    <div className="bg-[#DFE0DF] min-h-screen">
      <div className="h-screen max-h-[25vh]"></div>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-bold text-[4rem] text-[#222]">Do it Now</h1>
        <section className="mt-7">
          <div className="flex bg-white rounded-btn h-20 relative items-center">
            <input
              type="text"
              placeholder="Add a new to-do item"
              className="input input-bordered grow w-full border-none rounded-r-none h-full pr-20"
            />
            <button type="button" className="absolute right-24">
              <span className="sr-only">Change color</span>
              <div className="rounded-full bg-[#808080] size-11"></div>
            </button>
            <button
              type="button"
              className="btn btn-square border-none rounded-l-none bg-[#A925F1] size-20"
            >
              <span className="sr-only">Add a new to-do item</span>
              <img src={plusIcon} width={24} height={24} alt="" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
