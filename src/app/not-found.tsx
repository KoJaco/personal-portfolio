import { IconLink } from '@/components/ui/icon-link'
import { StarField } from '@/components/star-field'

export default function NotFound() {
  return (
    <>
      {/* <div className="relative isolate flex flex-auto flex-col items-center justify-center overflow-hidden bg-transparent text-center"> */}
      <div className="flex h-screen w-full flex-auto items-center justify-center">
        {/* <StarField className="sm:-mt-16" /> */}

        <div className="border-1 relative z-10 flex h-[400px] w-96 flex-col justify-center rounded-2xl border border-gray-700/25 bg-gray-950/90 text-center shadow backdrop-blur-sm">
          <p className="font-display text-4xl/tight font-light text-white">
            404
          </p>
          <h1 className="mt-4 font-display text-xl/8 font-semibold text-gray-100">
            Page not found
          </h1>
          <p className="mt-2 text-sm/6 text-gray-300">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <IconLink href="/" className="mt-4 self-center">
            Go back home
          </IconLink>
        </div>
      </div>
    </>
  )
}
