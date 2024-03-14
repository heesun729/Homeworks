import React from 'react';
import { IoCart, IoPerson, IoLogOut } from 'react-icons/io5';

export default function Header() {
    return (
        <div className="flex justify-between items-center p-4 border-b-2 border-stone-400 text-stone-600">
            <span className="text-xl font-bold">Soohyun Shop</span>
            <div>
                <button className="mx-2 bg-stone-400 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded">
                    <IoCart />
                </button>
                <button className="mx-2 bg-stone-400 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded">
                    <IoPerson />
                </button>
                <button className="mx-2 bg-stone-400 hover:bg-stone-600 text-white font-bold py-2 px-4 rounded">
                    <IoLogOut />
                </button>
            </div>
        </div>
    );
}
