const InputField = ({value, setValue, id}) => {
    return (
        <div className="text-zinc-500 flex flex-col gap-2 min-w-xl">
            <label htmlFor={id} className="ml-2 text-lg text-white ">{id}: </label>
            <input 
            type="text" 
            id="title"
            name="title" 
            required
            value={value}
            placeholder={id}
            className="border border-zinc-500 px-3 py-1 text-lg w-xl"
            onChange={(e) => setValue(e.target.value)}
            />

        </div>
    );
}

export default InputField;
