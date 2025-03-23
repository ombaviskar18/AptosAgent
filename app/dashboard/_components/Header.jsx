"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Header() {
    const path = usePathname();
    const [walletAddress, setWalletAddress] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window.petra !== 'undefined') {
                try {
                    const isConnected = await window.petra.isConnected();
                    if (isConnected) {
                        const account = await window.petra.account();
                        setWalletAddress(account.address);
                    }
                } catch (error) {
                    console.error('Connection check failed:', error);
                }
            }
        };
        checkConnection();
    }, []);

    const connectWallet = async () => {
        if (typeof window.petra !== 'undefined') {
            try {
                const address = await window.petra.connect();
                setWalletAddress(address);
                await navigator.clipboard.writeText(address);
                alert('Wallet address copied to clipboard!');
            } catch (error) {
                console.error('Failed to connect to Petra wallet:', error);
            }
        } else {
            alert('Please install the Petra wallet extension.');
        }
    };

    const truncateAddress = (address) => {
        if (typeof address === 'string' && address.length > 8) {
            return `${address.slice(0, 4)}...${address.slice(-4)}`;
        }
        return 'Wallet Address'; 
    };

    return (
        <div className='flex flex-col md:flex-row p-4 items-center justify-between bg-gray-950 shadow-sm gap-4'>
            <Link href="/" className='flex items-center cursor-pointer'>
                <Image src="/logo.png" alt="Logo" width={42} height={42} />
                <span className='text-2xl font-bold text-gray-400 hover:text-gray-700 transition-colors mb-2 ml-2'>
                Aptos MiniHub
                </span>
            </Link>

          
            <ul className='flex gap-6 ml-auto'>
                <Link href={"/dashboard"}>
                    <li className={`text-gray-400 font-bold hover:text-gray-700 transition-all cursor-pointer
                    ${path === '/dashboard' && 'text-gray-400 font-bold'}
                    `}>Games</li>
                </Link>
                <Link href={"/dashboard/leaderboard"}>
                    <li className={`text-gray-400 font-bold hover:text-gray-700 transition-all cursor-pointer
                    ${path === '/dashboard' && 'text-gray-400 font-bold'}
                    `}>LeaderBoard</li>
                </Link>
                <Link href={"/dashboard/telegram"}>
                    <li className={`text-gray-400 font-bold hover:text-gray-700 transition-all cursor-pointer
                    ${path === '/telegram' && 'text-gray-400 font-bold'}
                    `}>Telegram</li>
                </Link>
                <Link href={"/dashboard/upgrade"}>
                    <li className={`text-gray-400 font-bold hover:text-gray-700 transition-all cursor-pointer
                    ${path === '/dashboard/upgrade' && 'text-gray-400 font-bold'}
                    `}>Pricing</li>
                </Link>
            </ul>

           
            <div className="flex items-center gap-4">
                <button 
                    onClick={connectWallet} 
                    className='ml-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors'
                >
                    {walletAddress ? truncateAddress(walletAddress) : 'Connect Wallet'}
                </button>

               
            </div>
        </div>
    );
}

export default Header;