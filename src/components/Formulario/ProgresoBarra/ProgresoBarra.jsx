
const ProgresoBarra = ({ step }) => {
    return (
        <>
            <div className="flex justify-between mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={ s } className={`h-2 w-full mx-1 rounded-full ${step >= s ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                ))}
            </div>
        </>
    )
}

export default ProgresoBarra