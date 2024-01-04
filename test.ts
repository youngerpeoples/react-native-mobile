import { ethers } from "ethers";
import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey } from "@scure/bip32";
(async () => {

    const ak = HDKey.fromMasterSeed(await bip39.mnemonicToSeed(bip39.generateMnemonic(wordlist))).privateKey;
    if(!ak){
        throw new Error('error')
    }
    const a = new ethers.Wallet(Buffer.from(ak).toString('hex'))
    console.log('pubkey',a.signingKey.compressedPublicKey)
    console.log('prikey',a.signingKey.privateKey)

    const bk = HDKey.fromMasterSeed(await bip39.mnemonicToSeed(bip39.generateMnemonic(wordlist))).privateKey;
    if(!bk){
        throw new Error('error')
    }
    const b = new ethers.Wallet(Buffer.from(bk).toString('hex'))
    console.log('pubkey',b.signingKey.compressedPublicKey)
    console.log('prikey',b.signingKey.privateKey)

    const ask = a.signingKey.computeSharedSecret(b.signingKey.compressedPublicKey)
    const bsk = b.signingKey.computeSharedSecret(a.signingKey.compressedPublicKey)
    console.log('ask',ask)
    console.log('bsk',bsk)
})()