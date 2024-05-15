import React, { useState } from "react";
import { ReactComponent as Cross } from '../svgs/cross.svg';
import { ReactComponent as Circle } from '../svgs/circle.svg';



const TicTacToeItem = (props: any) => {

    const [twoDimArr, setTwoDimArr] = useState(
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    );


    const handleClick = (key: number, index: number) => {
        if (!props.active || twoDimArr[key][index] !== 0) {
            return;
        }
        let value = props.cross ? 1 : -1;

        const nextArr = [...twoDimArr];
        nextArr[key][index] = value;
        let result = props.runCheck(nextArr);
        if (result) {
            props.handleWinner(props.i, props.j, result);
        } else {
            setTwoDimArr(nextArr);
            props.handleNextTurn(key, index);
        }
    }

    return (
        <div className="grid grid-rows-3 divide-y divide-blue-200">
            {twoDimArr.map((item, key) => {
                return (
                    <div className="grid grid-cols-3 divide-x divide-blue-200" key={"out" + key}>
                        {item.map((i, index) => {
                            return (
                                <div
                                    onClick={() => handleClick(key, index)}
                                    key={"in" + index}
                                    className={i === 0 ? "p-4 hover:cursor-pointer hover:bg-slate-400 flex justify-center items-center" 
                                    : "flex justify-center items-center"}>
                                    {i === 0 ? '' : i === 1 ?
                                        <Cross width='32px' height='32px' fill="#d9004c" />
                                        :
                                        <Circle width='32px' height='32px' fill="#0033aa" strokeWidth={0} />}
                                </div>
                            );
                        })}

                    </div>
                );
            })
            }
        </div>
    );
}

export default TicTacToeItem;