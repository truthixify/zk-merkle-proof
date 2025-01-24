
export default async function verifyProof() {
    const input = {
        
    }

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        "circuit.wasm",
        "circuit_final.zkey"
    )

    const vkey = await fetch("verification_key.json").then(res => res.json)

    const res = await snarkjs.groth16.verify(vkey, publicSignals, proof)

    return res
}