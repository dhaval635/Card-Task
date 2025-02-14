import { FaUserCircle } from "react-icons/fa";
const Header = () => {
    return (
        <>
            <header className="flex justify-between p-4 bg-white shadow-md w-full">
                <span className="text-lg font-semibold">Cards</span>
                <FaUserCircle className="text-2xl text-gray-600" />
            </header>
        </>
    )
}

export default Header