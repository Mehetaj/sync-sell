import EyeLoader from "../components/eye-loading";


export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <EyeLoader />
      <p className="mt-8 font-metal tracking-[0.3em] text-sm">LOADING</p>
    </div>
  )
}

