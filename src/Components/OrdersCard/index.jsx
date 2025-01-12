import { ChevronRightIcon } from "@heroicons/react/24/solid";

const OrdersCard = (props) => { 
    const { totalPrice, totalProducts } = props;
    const date = '01.02.23';

    return (
    <div className="w-[400px] mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 mb-3 border border-black rounded-lg shadow-md bg-white gap-6">

        <div>
            <span className="block text-xs text-gray-500">Date</span>
            <span className="text-gray-800 font-medium">{date}</span>
        </div>

        <div className="flex flex-col items-center">
            <span className="block text-xs text-gray-500">Products</span>
            <span className="text-gray-800 font-medium">
                {totalProducts} Articles
            </span>
        </div>

        <div>
            <span className="block text-xs text-gray-500">Total</span>
            <span className="text-green-700 font-semibold">${totalPrice}</span>
        </div>

        <div>
            <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
        </div>
    </div>
    );
};

export default OrdersCard;




