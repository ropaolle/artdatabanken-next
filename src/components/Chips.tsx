"use client";

import { useEffect } from "react";
import Image from "next/image";

const MyComponent = () => {
  useEffect(() => {
    const init = async () => {
      const { Chip, Ripple, initTE } = await import("tw-elements");
      initTE({ Chip, Ripple });
    };
    init();
  }, []);

  return (
    <>
      <div
        data-te-chip-init
        data-te-ripple-init
        className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
        data-te-close="true"
      >
        Text
      </div>

      <div
        data-te-chip-init
        data-te-ripple-init
        className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
      >
        <Image
          className="my-0 -ml-[12px] mr-[8px] h-[inherit] w-[inherit] rounded-[100%]"
          src="/avatar.webp"
          alt="Contact Person"
          width={50}
          height={50}
        />
        John Doe
        <span
          data-te-chip-close
          className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </div>

      <div
        data-te-chip-init
        data-te-ripple-init
        className="[word-wrap: break-word] my-[5px] mr-4 flex h-[42px] cursor-pointer items-center justify-between rounded-[21px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
      >
        <Image
          className="my-0 -ml-[12px] mr-[8px] h-[inherit] w-[inherit] rounded-[100%]"
          src="/avatar.webp"
          alt="Contact Person"
          width={50}
          height={50}
        />
        John Doe
        <span
          data-te-chip-close
          className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </div>

      <div
        data-te-chip-init
        data-te-ripple-init
        className="[word-wrap: break-word] my-[5px] mr-4 flex h-[52px] cursor-pointer items-center justify-between rounded-[26px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
      >
        <Image
          className="my-0 -ml-[12px] mr-[8px] h-[inherit] w-[inherit] rounded-[100%]"
          src="/avatar.webp"
          alt="Contact Person"
          width={50}
          height={50}
        />
        John Doe
        <span
          data-te-chip-close
          className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </div>
    </>
  );
};

export default MyComponent;
