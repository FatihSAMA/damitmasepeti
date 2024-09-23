import { useState, useRef } from "react"
import {PortableText} from '@portabletext/react'

export default function Accordion({title, content}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className={`w-full rounded-md bg-neutral-100 border ${isOpen ? "border-secondary/60" : "border-zinc-200"} transition-all overflow-hidden`}>
      <button
        className={`p-3.5 flex justify-between items-center w-full ${isOpen && "bg-secondary/60"}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h5 className="text-lg text-copy font-semibold text-left">
            {title}
        </h5>
        <svg
          className={`transition-all ${isOpen ? "-rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
            <path fill="currentColor" d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"></path>
          </g>
        </svg>
      </button>

      <div
        ref={contentRef}
        className="w-full overflow-hidden transition-all text-left"
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
        }}
      >
        <div className="p-3.5">
          <PortableText value={content} />
        </div>
      </div>
    </div>
  );
}
