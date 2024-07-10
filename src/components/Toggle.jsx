export default function Toggle({state, setState}){
    return(
        <div
            className={`w-10 h-6 flex items-center rounded-full cursor-pointer border border-zinc-300 p-[2px] ${state ? 'bg-secondary' : 'bg-foreground '}`}
            onClick={() => setState(!state)}
        >
            <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transition-all transform ${state ? 'translate-x-4' : 'translate-x-0'}`}
            />
        </div>
    )
}