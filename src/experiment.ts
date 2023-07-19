import { AddressLike, BaseContract, ContractFactory, JsonRpcProvider, Overrides, Wallet } from "ethers";
import { abi as ERC20ABI, bytecode as ERC20ByteCode } from "@uniswap/v2-periphery/build/ERC20.json";

type TokenContract = BaseContract & {
    name(overides?: Overrides): Promise<string>;
    symbol(overides?: Overrides): Promise<string>;
    decimals(overides?: Overrides): Promise<number>;
    totalSupply(overides?: Overrides): Promise<bigint>;
    balanceOf(owner: AddressLike, overides?: Overrides): Promise<bigint>;
    transfer(to: AddressLike, value: bigint, overides?: Overrides): Promise<boolean>;
    transferFrom(from: AddressLike, to: AddressLike, value: bigint, overides?: Overrides): Promise<boolean>;
    approve(spender: AddressLike, value: bigint, overides?: Overrides): Promise<boolean>;
    allowance(owner: AddressLike, spender: AddressLike, overides?: Overrides): Promise<bigint>;
}

async function main() {
    console.log("connecting ...");
    const initialSupply = 100000000000n;
    const provider = new JsonRpcProvider("http://localhost:8545");
    provider.pollingInterval = 250;
    await provider.ready
    console.log("connected");

    const signer = new Wallet("0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e", provider);
    const factory = new ContractFactory<any[], TokenContract>(ERC20ABI, ERC20ByteCode, signer);
    for(let index = 0; index <= 5; index++) {
        console.log("deploying ERC20 token");
        const contract = await factory.deploy(initialSupply);
        // await contract.waitForDeployment(); // <-- Why is this needed? In ether v5, one was not forced to wait until the deployment transaction was mined.
        console.log("ERC20 token deployed to %s", await contract.getAddress());
    }
    console.log("done")
}
main();