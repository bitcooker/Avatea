import * as React from "react";
import Image from "next/image";

// core components
import InputEmpty from "../../../components/core/Input/InputEmpty";
import ButtonFit from "../../../components/core/Button/ButtonFit";

export default function FarmsCardItem(props) {
    return (
        <div className="flex flex-col p-6 bg-white rounded-2.5xl gap-5 divide-y">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Image src={props.image} alt="farmImage" width={64} height={64} objectFit="none" />
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold">{props.title}</h1>
                        <div className="flex gap-2 justify-end">
                            <div className="flex items-center px-2 py-1 gap-2 border-2 border-green-500 rounded-full">
                                <i className="fa-solid fa-badge-check text-green-500 text-lg" />
                                <span className="text-green-500">No Feeds</span>
                            </div>
                            <div className="flex items-center px-2 py-1 bg-indigo-500 text-white rounded-full">
                                {props.multiplier}X
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex p-2 flex-col text-black-500">
                    <div className="flex justify-between">
                        <span>APR:</span>
                        <span className="font-semibold">{props.apr}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Stake:</span>
                        <span className="font-semibold">{props.stake}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Earn:</span>
                        <span className="font-semibold">{props.earn}</span>
                    </div>
                </div>

                <div className="flex flex-col px-2 gap-1">
                    <label className="text-indigo-500"><span className="font-semibold">{props.earn}</span> EARNED</label>
                    <div className="grid grid-cols-2 gap-2">
                        <InputEmpty id="mercor-earned" name="earned" type="number" value="0" readOnly />
                        <ButtonFit name="Harvest" disabled />
                    </div>
                </div>

                <div className="flex flex-col px-2 gap-1 text-indigo-500">
                    <label><span className="font-semibold">{props.title}</span> STAKED</label>
                    <ButtonFit name="Unlock Wallet" />
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 pt-5 text-indigo-500 hover:text-indigo-500/80 hover:cursor-pointer transition">
                Details <i className="fa-solid fa-arrow-down" />
            </div>
        </div>
    )
}