export const InputForm = ({ typeInput = "text", nameInput, handleInputState, placeholderInput }) => {

    return (
        <div>
            <input
                type={typeInput}
                {...handleInputState(nameInput, { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md rounded-md my-2" 
                placeholder={placeholderInput}
            />
        </div>
    );
};