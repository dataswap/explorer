import { MatchingBidType } from "@/types/matching"
import { IMatchingBidsTabel } from "@/components/matching/bid/tabel"

export function getMatchingBidsTabel(
    datasetProofs: MatchingBidType[]
): IMatchingBidsTabel[] {
    const result: IMatchingBidsTabel[] = []

    datasetProofs.forEach((datasetProof, index) => {
        result[index] = {
            key: datasetProof.bidder,
            bidder: datasetProof.bidder,
            bid: datasetProof.bid,
            bidTime: datasetProof.bidTime,
        }
    })

    return result
}
