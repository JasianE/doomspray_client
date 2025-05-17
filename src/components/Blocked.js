export default function Example() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-3xl font-Khand text-gray-900">
            Have the urge to scroll? Don't worry, the fear of being splashed will overpower it!
          </h2>
          <h2 className="text-center text-2xl font-Khand pt-5 text-gray-900">
              <span class="line-through"> Block out</span> Splash out this century's biggest distractors
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              alt="Instagram"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
              width={178}
              height={48}
              className="pt-3 col-span-2 object-contain lg:col-span-1"
            />
            <img
              alt="Tiktok"
              src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"
              width={178}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Linkedin"
              src="https://upload.wikimedia.org/wikipedia/commons/a/aa/LinkedIn_2021.svg"
              width={178}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Reddit"
              src="https://cdn.worldvectorlogo.com/logos/reddit-1.svg"
              width={178}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <img
              alt="Youtube"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              width={178}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
        </div>
      </div>
    )
  }