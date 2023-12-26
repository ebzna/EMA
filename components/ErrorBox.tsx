
const ErrorBox = ({ title }: { title: String | undefined }) => {
    return <div className="text-red-500 text-center w-full">
        {title}
    </div>
}

export default ErrorBox