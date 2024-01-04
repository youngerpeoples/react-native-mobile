import { Wallet } from "ethers";
import { atom } from "recoil";

export const NowAccount = atom<Wallet|null>({
    key: "NowAccount",
    default: null,
    effects_UNSTABLE: [
        ({onSet}) => {
            onSet((newValue) => {
                global.wallet = newValue;
            })
        }
    ]
});