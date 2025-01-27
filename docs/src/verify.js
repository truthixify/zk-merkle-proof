import { groth16 } from "snarkjs"
import { ToastSuccess, ToastFailed} from "./utils/toast"

export default async function verifyProof(contract, leaf, path_index, path_elements) {
    if (!contract) {
        ToastFailed("Contract not initialized!")
        return
    }

    try {
        const data = {
            leaf,
            path_elements,
            path_index,
        }
    
        const { proof, publicSignals } = await groth16.fullProve(
            data,
            "/circuit.wasm",
            "/circuit_final.zkey"
        )
    
        const calldata = await groth16.exportSolidityCallData(proof, publicSignals)
    
        const argv = calldata
        .replace(/["[\]\s]/g, "")
        .split(",")
        .map((x) => BigInt(x).toString())
    
        const a = [argv[0], argv[1]]
        const b = [
        [argv[2], argv[3]],
        [argv[4], argv[5]],
        ]
        const c = [argv[6], argv[7]]
        const input = argv.slice(8)
    
        const res = await contract.methods.verify(a, b, c, input).call()
    
        ToastSuccess("proof successfully verified")
    } catch (err) {
        ToastFailed(err)
    }
}