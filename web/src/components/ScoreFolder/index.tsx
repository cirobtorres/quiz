import TotalScore from "../../models/Score";
import { LastScoreCard, TotalScoreCard } from "./ScoreFolderUtils";

export default function UserScoreFolder({
  totalScore,
  scoreObj,
}: {
  totalScore: TotalScore;
  scoreObj: number[];
}) {
  return (
    <>
      <TotalScoreCard score={totalScore} />
      <div className="w-full flex gap-2">
        <LastScoreCard scoreId={scoreObj[1]} />
        <LastScoreCard scoreId={scoreObj[2]} />
      </div>
    </>
  );
}
