import { ContractFactory, JsonRpcProvider, Wallet } from "ethers";
import { abi as ERC20ABI, bytecode as ERC20ByteCode } from "@uniswap/v2-periphery/build/ERC20.json";


async function main() {
    console.log("connecting ...");
    const initialSupply = 100000000000n;
    const provider = new JsonRpcProvider("http://localhost:8545");
    await provider.ready
    console.log("connected");

    const signer = new Wallet("0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e", provider);
    const factory = new ContractFactory(ERC20ABI, ERC20ByteCode, signer);
    for(let index = 0; index <= 5; index++) {
        console.log("deploying ERC20 token #%d", index);
        const contract = await factory.deploy(initialSupply);
        console.log("ERC20 token #%d deployed to %d", index, await contract.getAddress());
    }
    console.log("done")
}
main();