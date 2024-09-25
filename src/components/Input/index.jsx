export default function Input({ title, unit, setter, value }) {
    const handleChange = (e) => {
        const newValue = e.target.value;

        // Eğer input boşsa, null yap, aksi halde direkt setter ile değeri güncelle
        if (newValue === '') {
            setter(null);
        } else {
            setter(parseFloat(newValue));
        }
    };

    const handleIncrement = () => {
        setter((prev) => (prev || 0) + 1);
    };

    const handleDecrement = () => {
        setter((prev) => (prev || 0) - 1);
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            {title && (
                <label>
                    {title}, <b>{unit}</b>
                </label>
            )}
            <div className="relative">
                <input
                    className="input"
                    type="number"
                    value={value !== null && value !== undefined ? value : ''}
                    onChange={handleChange}
                />
                {/* Buttons */}
                <div className="absolute bottom-0 right-0 flex gap-0.5">
                    <button
                        className="p-2 bg-zinc-400 text-white hover:bg-primary transition-colors duration-300 rounded-md"
                        onClick={handleDecrement}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M1.75 8a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5h-11A.75.75 0 0 1 1.75 8"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <button
                        className="p-2 bg-zinc-400 text-white hover:bg-primary transition-colors duration-300 rounded-md"
                        onClick={handleIncrement}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="currentColor"
                                d="M19.05 5.06c0-1.68-1.37-3.06-3.06-3.06s-3.07 1.38-3.06 3.06v7.87H5.06C3.38 12.93 2 14.3 2 15.99c0 1.68 1.38 3.06 3.06 3.06h7.87v7.86c0 1.68 1.37 3.06 3.06 3.06c1.68 0 3.06-1.37 3.06-3.06v-7.86h7.86c1.68 0 3.06-1.37 3.06-3.06c0-1.68-1.37-3.06-3.06-3.06h-7.86z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
