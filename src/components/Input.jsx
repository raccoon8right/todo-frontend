function Input({ type, placeholder, value, onChange }) {
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} className='w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-purple-500' />
    )
}

export default Input