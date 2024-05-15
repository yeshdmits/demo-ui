import React, { useEffect, useState } from "react";
import { ReactComponent as Cross } from '../svgs/cross.svg';
import { ReactComponent as Circle } from '../svgs/circle.svg';
import TicTacToeItem from "./TicTacToeItem";

const initialState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

const TicTacToePlus = () => {
    const [fullBoard, setFullBoard] = useState(initialState);
    const [cross, setCross] = useState<boolean>(true);
    const [winner, setWinner] = useState<number>(0);
    const [nextTurn, setNextTurn] = useState<any>(null);

    const handleWinner = (key: number, index: number, value: number) => {
        const nextArray = [...fullBoard];
        nextArray[key][index] = value;
        setFullBoard(nextArray);
        const result = runCheck(nextArray);
        if (result) {
            setWinner(result);
        } else {
            setNextTurn(null);
        }
        setCross(prev => !prev);
    }

    const handleNextTurn = (key: number, index: number) => {
        if (fullBoard[key][index] !== 0) {
            setNextTurn(null);
        } else {
            setNextTurn({ row: key, col: index });
        }
        setCross(prev => !prev);
    }

    const handleRestart = () => {
        window.location.reload()
    }

    const runCheck = (fields: number[][]) => {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i][0] !== 0 && fields[i][0] === fields[i][1] && fields[i][0] === fields[i][2]) {
                return fields[i][0];
            }
        }

        for (let j = 0; j < fields.length; j++) {
            if (fields[0][j] !== 0 && fields[0][j] === fields[1][j] && fields[0][j] === fields[2][j]) {
                return fields[0][j];
            }
        }
        if (fields[0][0] !== 0 && fields[0][0] === fields[1][1] && fields[0][0] === fields[2][2]) {
            return fields[0][0];
        }
        if (fields[0][2] !== 0 && fields[0][2] === fields[1][1] && fields[0][2] === fields[2][0]) {
            return fields[0][2];
        }

        let isDraw = true;
        for (let i = 0; i < fields.length; i++) {
            for (let j = 0; j < fields.length; j++) {
                if (fields[i][j] === 0) {
                    isDraw = false;
                    break;
                }
            }
            if (!isDraw) break;
        }
        if (isDraw) {
            return 0;
        }

        return null;
    }

    return (
        <div>
            <div className="grid grid-rows-3 divide-y divide-zinc-700">
                {fullBoard.map((item, key) => {
                    console.log(nextTurn);
                    return (
                        <div className="grid grid-cols-3 divide-x divide-zinc-700 auto-cols-max max-h-32" key={"highout" + key}>
                            {item.map((i, index) => {
                                if (i === 0) {
                                    return (
                                        <div className={
                                            nextTurn === null || (key === nextTurn.row && index === nextTurn.col) ?
                                                "grid grid-rows-1 justify-center bg-teal-100 max-h-32" :
                                                "grid grid-rows-1 justify-center max-h-32"
                                        }

                                            key={"highin" + index}>
                                            <TicTacToeItem
                                                // key={"highin" + index}
                                                handleWinner={handleWinner}
                                                runCheck={runCheck}
                                                handleNextTurn={handleNextTurn}
                                                i={key}
                                                j={index}
                                                active={nextTurn === null || (key === nextTurn.row && index === nextTurn.col)}
                                                cross={cross}
                                            />
                                        </div>
                                    );
                                } else {
                                    return <div key={"highin" + index} className="flex justify-center items-center">
                                        {i === 1 ?
                                            <Cross width='60px' height='60px' fill="#d9004c" />
                                            :
                                            <Circle width='60px' height='60px' fill="#0033aa" stroke="#0033aa" strokeWidth={0} />
                                        }
                                    </div>
                                }
                            })}

                        </div>
                    );
                })
                }
            </div>
            <div className="grid grid-rows-3 max-h-40">
                <div className="flex justify-around items-center">
                    <div className="flex flex-col items-center">Move: 
                    {cross ?
                        <Cross width='16px' height='16px' fill="#d9004c" />
                        :
                        <Circle width='16px' height='16px' fill="#0033aa" stroke="#0033aa" strokeWidth={0} />
                    }
                    </div>
                </div>

                <div className="flex justify-around items-center">
                    {winner !== 0 &&
                        <div className="flex flex-col items-center">Winner:
                            {winner === 1 ?
                                <Cross width='16px' height='16px' fill="#d9004c" />
                                :
                                <Circle width='16px' height='16px' fill="#0033aa" stroke="#0033aa" strokeWidth={0} />
                            }
                        </div>
                    }
                </div>
                <div className="flex justify-around items-center">
                    {winner !== 0 &&
                        <div onClick={handleRestart}
                        className="flex flex-col items-center bg-orange-300 p-4 m-2 w-full hover:cursor-pointer">
                            Restart
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}

export default TicTacToePlus;